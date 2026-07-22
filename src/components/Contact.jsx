import { useState } from "react";
import { useLang } from "../i18n.jsx";
import Reveal from "./Reveal.jsx";
import { uploadToCloudinary } from "../cloudinary.js";

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "model/stl",
  "model/3mf",
  "model/gltf-binary",
  "model/gltf+json",
];

const ALLOWED_EXTENSIONS = [
  "png",
  "jpg",
  "doc",
  "docx",
  "stl",
  "3mf",
  "amf",
  "glb",
  "gltf",
];

const MAX_FILES = 5;
const MAX_SIZE = 50 * 1024 * 1024;

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const { t } = useLang();

  function validateFile(file) {
    const extension = file.name.split(".").pop().toLowerCase();

    const isAllowed = ALLOWED_EXTENSIONS.includes(extension);

    if (!isAllowed) {
      alert(`${file.name} ${t.contact.allowedFormatAlert}`);

      return false;
    }

    if (file.size > MAX_SIZE) {
      alert(`${file.name} ${t.contact.allowedSizeAlert}`);

      return false;
    }

    return true;
  }

  function addFiles(selectedFiles) {
    const newFiles = Array.from(selectedFiles);

    if (files.length + newFiles.length > MAX_FILES) {
      alert(`${t.contact.maxFilesAlert}`);
      return;
    }

    const validFiles = newFiles.filter(validateFile);

    setFiles((prev) => [...prev, ...validFiles]);
  }

  function handleDrop(e) {
    e.preventDefault();

    setDragActive(false);

    addFiles(e.dataTransfer.files);
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    if (form.botcheck.checked) return;

    if (files.length === 0) {
      alert(`${t.contact.filesLengthAlert}`);

      return;
    }

    setStatus("sending");

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const url = await uploadToCloudinary(file, (progress) => {
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        });

        uploadedUrls.push({
          name: file.name,
          url,
        });
      }

      const [{ db }, { addDoc, collection, serverTimestamp }] =
        await Promise.all([
          import("../firebase.js"),
          import("firebase/firestore"),
        ]);

      await addDoc(collection(db, "leads"), {
        name: form.name.value.trim(),

        phone: form.phone.value.trim(),

        message: form.message.value.trim(),

        files: uploadedUrls,

        createdAt: serverTimestamp(),
      });

      setStatus("success");

      setFiles([]);

      form.reset();
    } catch (err) {
      console.error("Firestore submit failed:", err);

      alert(`${t.contact.errAlert}`);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container contact">
        <Reveal className="contact__info" variant="left">
          <h2 className="section__title section__title--left">
            {t.contact.title}
          </h2>

          <p className="contact__lead">
            {t.contact.lead}

            <span className="contact__lead contact__lead-span">
              {t.contact.lead2}
            </span>
          </p>

          <ul className="contact__list">
            <li>
              <span className="contact__label">{t.contact.phoneLabel}</span>

              <a href="tel:+380671234567">+38 (068) 791-83-19</a>
            </li>

            <li>
              <span className="contact__label">{t.contact.emailLabel}</span>

              <a href="mailto:3dprintadmin42@gmail.com">
                3dprintadmin42@gmail.com
              </a>
            </li>

            <li>
              <span className="contact__label">{t.contact.hoursLabel}</span>

              <span>{t.contact.hours}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal variant="right" delay={120}>
          <form className="card contact__form" onSubmit={handleSubmit}>
            {status === "success" ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>

                <h3>{t.contact.successTitle}</h3>

                <p>{t.contact.successText}</p>
              </div>
            ) : (
              <>
                <h3 className="contact__form-title">{t.contact.formTitle}</h3>

                <input
                  type="checkbox"
                  name="botcheck"
                  className="contact__honeypot"
                />

                <label>
                  {t.contact.nameLabel}

                  <input
                    type="text"
                    name="name"
                    placeholder={t.contact.namePlaceholder}
                    required
                  />
                </label>

                <label>
                  {t.contact.phoneFieldLabel}

                  <input
                    type="tel"
                    name="phone"
                    placeholder={t.contact.phonePlaceholder}
                    required
                  />
                </label>

                <label>
                  {t.contact.messageLabel}

                  <textarea
                    name="message"
                    rows="4"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </label>

                <div
                  className={dragActive ? "upload-box active" : "upload-box"}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <p>{t.contact.drag}</p>

                  <input
                    type="file"
                    multiple
                    onChange={(e) => addFiles(e.target.files)}
                    accept={ALLOWED_EXTENSIONS.map((x) => "." + x).join(",")}
                  />
                </div>

                <div className="file-list">
                  {files.map((file, index) => (
                    <div className="file-item" key={file.name}>
                      <span>{file.name}</span>

                      <button type="button" onClick={() => removeFile(index)}>
                        ✕
                      </button>

                      {uploadProgress[file.name] !== undefined && (
                        <div>{uploadProgress[file.name]}%</div>
                      )}
                    </div>
                  ))}
                </div>

                {status === "error" && (
                  <p className="contact__form-error">{t.contact.error}</p>
                )}

                <button
                  type="submit"
                  className="btn btn--primary btn--full"
                  disabled={status === "sending"}
                >
                  {status === "sending"
                    ? `${t.contact.loading}`
                    : t.contact.submit}
                </button>

                <p className="contact__form-note">{t.contact.note}</p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
