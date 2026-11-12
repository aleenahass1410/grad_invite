
import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  MessageCircle,
  Sparkles,
  GraduationCap,
  Clock,
  CalendarDays
} from "lucide-react";

// ==========================================
// PERSONALIZE THESE DETAILS BEFORE SHARING
// ==========================================

const WHATSAPP_NUMBER = "923333348440";
const BROTHER_PHOTO = `${import.meta.env.BASE_URL}brother-photo.jpg`;

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Haji+Altaf+Pakwan+Centre+Ruqaiya+Square+Karachi";

const rsvpText = encodeURIComponent(
  "Assalamualaikum! I would love to RSVP for the graduation celebration on Saturday, 14 November."
);


// ==========================================
// SCRATCH TO REVEAL COMPONENT
// ==========================================

function ScratchReveal({ active }) {
  const canvasRef = useRef(null);

  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  const drawing = useRef(false);
  const lastPoint = useRef(null);

  // Draw the golden scratch coating
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !active) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(
      0, 0, rect.width, rect.height
    );

    gradient.addColorStop(0, "#e9cf86");
    gradient.addColorStop(0.45, "#bd9446");
    gradient.addColorStop(1, "#f4e4b4");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Golden foil texture
    for (let i = 0; i < 180; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.24})`;

      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Instructions written on the foil
    ctx.fillStyle = "rgba(39, 28, 12, 0.85)";
    ctx.textAlign = "center";
    ctx.font = "600 13px Arial";

    ctx.fillText(
      "SCRATCH TO REVEAL THE DETAILS",
      rect.width / 2,
      rect.height / 2 - 5
    );

    ctx.font = "11px Arial";

    ctx.fillText(
      "✧ Use your finger or mouse ✧",
      rect.width / 2,
      rect.height / 2 + 19
    );

  }, [active]);


  // Get mouse or touch position
  const getPoint = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };


  // Scratch the golden surface
  const scratch = (event) => {
    if (!drawing.current || revealed) return;

    event.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const point = getPoint(event);

    ctx.globalCompositeOperation = "destination-out";

    ctx.lineWidth = 40;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();

    if (lastPoint.current) {
      ctx.moveTo(
        lastPoint.current.x,
        lastPoint.current.y
      );

      ctx.lineTo(point.x, point.y);

    } else {
      ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
    }

    ctx.stroke();

    lastPoint.current = point;

    setStarted(true);


    // Calculate how much of the foil has been scratched
    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 80) {
        transparentPixels++;
      }
    }

    const scratchedPercentage =
      transparentPixels / (pixels.length / 4);


    // Reveal details after 38% of the foil is scratched
    if (scratchedPercentage >= 0.38) {
      drawing.current = false;
      lastPoint.current = null;
      setRevealed(true);
    }
  };


  const stopScratching = () => {
    drawing.current = false;
    lastPoint.current = null;
  };


  return (
    <div className={`scratch-wrap ${revealed ? "is-revealed" : ""}`}>

      {!revealed ? (

        <canvas
          ref={canvasRef}
          className="scratch-canvas"

          style={{
            zIndex: 5,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            touchAction: "none",
            cursor: "crosshair"
          }}

          onPointerDown={(event) => {
            drawing.current = true;

            event.currentTarget.setPointerCapture(
              event.pointerId
            );

            scratch(event);
          }}

          onPointerMove={scratch}
          onPointerUp={stopScratching}
          onPointerCancel={stopScratching}
        />

      ) : (

        <div className="revealed-details">

          <div className="detail-item">
            <CalendarDays size={20} />

            <span>
              <small>DATE</small>
              <strong>Saturday, 14 November 2026</strong>
            </span>
          </div>


          <div className="detail-item">
            <Clock size={20} />

            <span>
              <small>TIME</small>
              <strong>8:30 PM onwards</strong>
            </span>
          </div>


          <div className="detail-item">
            <MapPin size={20} />

            <span>
              <small>VENUE</small>
              <strong>Haji Altaf Restaurant</strong>
            </span>
          </div>

          <p className="revealed-note">
            The details are revealed — we can't wait to celebrate with you! ✨
          </p>

        </div>

      )}


      {!revealed && (
        <p className="scratch-hint">
          {started
            ? "Keep going, you're almost there…"
            : "Scratch the golden surface to reveal the surprise"}
        </p>
      )}

    </div>
  );
}



// ==========================================
// MAIN INVITATION WEBSITE
// ==========================================

function App() {

  const [opened, setOpened] = useState(false);

  const [coverGone, setCoverGone] = useState(false);

  const [photoError, setPhotoError] = useState(false);


  // Open envelope and remove the cover completely
  const openInvitation = () => {

    if (opened) return;

    setOpened(true);

    // Give the envelope animation time to play
    window.setTimeout(() => {
      setCoverGone(true);
    }, 950);

    // Scroll to the actual invitation after the cover disappears
    window.setTimeout(() => {
      document.getElementById("invitation")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 1050);

  };


  return (
    <main>

      {/* ==================================
          OPENING ENVELOPE SCREEN
      ================================== */}

      {!coverGone && (

        <section
          className={`cover ${opened ? "opened" : ""}`}

          style={{
            opacity: opened ? 0 : 1,
            transform: opened
              ? "scale(0.97) translateY(-20px)"
              : "scale(1) translateY(0)",
            filter: opened ? "blur(4px)" : "blur(0)",
            transition: "opacity 0.85s ease, transform 0.85s ease, filter 0.85s ease",
            pointerEvents: opened ? "none" : "auto"
          }}
        >

          <div className="stars" aria-hidden="true" />

          <div className="cover-content">

            <div className="floating-sparkles" aria-hidden="true">
              <i>✦</i>
              <i>✧</i>
              <i>·</i>
              <i>✦</i>
              <i>✧</i>
              <i>·</i>
            </div>


            <p className="eyebrow">
              <Sparkles size={14} />
              A SPECIAL MILESTONE
              <Sparkles size={14} />
            </p>


            <div className="crest">
              <GraduationCap size={43} strokeWidth={1.3} />
            </div>


            <h1>
              A Night to
              <br />
              <em>Celebrate</em>
            </h1>


            <p className="cover-subtitle">
              A milestone worth remembering.
              <br />
              A moment worth celebrating together.
            </p>


            {/* Clickable envelope and golden seal */}

            <button
              className="envelope-scene"
              onClick={openInvitation}
              aria-label="Click the golden seal to open the invitation"
              disabled={opened}
            >

              <span className="envelope-shadow" />

              <span className="envelope">

                <span className="envelope-flap" />

                <span className="envelope-seal">
                  ✦
                </span>

                <span className="envelope-letter">
                  <GraduationCap size={30} />
                  <span>YOU'RE INVITED</span>
                </span>

              </span>

              <span className="stamp-hint">
                ✧ CLICK THE GOLDEN SEAL ✧
              </span>

            </button>


            <button
              className="open-button"
              onClick={openInvitation}
              disabled={opened}
            >
              Open your invitation
              <span>✦</span>
            </button>


            <p className="tiny-note">
              TAP TO UNSEAL THE INVITATION
            </p>

          </div>


          <div className="cover-bottom">
            WITH JOY & GRATITUDE
          </div>

        </section>

      )}



      {/* ==================================
          MAIN SCROLLABLE INVITATION
      ================================== */}

      <div
        className={`invitation-page ${opened ? "visible" : ""}`}
        id="invitation"
      >

        <div className="gold-rule" />


        {/* GRADUATION INTRODUCTION */}

        <section className="hero-section section-shell">

          <p className="eyebrow dark">
            <span>✦</span>
            THE NEXT CHAPTER BEGINS
            <span>✦</span>
          </p>


          <div className="hat-illustration">
            <GraduationCap size={64} strokeWidth={1.1} />
            <span>✧</span>
          </div>


          <h2>
            Caps off to
            <br />
            <em>new beginnings.</em>
          </h2>


          <p className="intro-copy">
            With immense pride and happiness, Fareed and Saima
            invites you to celebrate a very special
            achievement — Syed Alee Hassan's graduation!
          </p>


          <div className="ornament">
            ✦　✧　✦
          </div>

        </section>



        {/* BROTHER'S PHOTOGRAPH */}

        <section className="photo-section section-shell">

          <div className="photo-frame">

            {!photoError ? (

              <img
                src={BROTHER_PHOTO}
                alt="Graduation celebration portrait"
                onError={() => setPhotoError(true)}
              />

            ) : (

              <div className="photo-placeholder">

                <GraduationCap size={48} />

                <span>
                  Add your brother's photo
                </span>

                <small>
                  Place brother-photo.jpg inside the public folder
                </small>

              </div>

            )}


            <span className="photo-corner top-left" />
            <span className="photo-corner bottom-right" />

          </div>


          <p className="photo-caption">
            THE GRADUATE
          </p>

        </section>



        {/* SCRATCH TO REVEAL DETAILS */}

        <section className="details-section section-shell">

          <p className="eyebrow dark">
            A LITTLE SURPRISE FOR YOU
          </p>


          <h2>
            Uncover the
            <br />
            <em>celebration details</em>
          </h2>


          <p className="section-copy">
            A little scratch, a lovely reveal.
            Scratch the golden panel below to discover
            when and where we'll be celebrating.
          </p>


          <ScratchReveal active={opened} />


          {/* GOOGLE MAPS */}

          <a
            className="map-button"
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
          >

            <MapPin size={18} />

            Open venue in Google Maps

            <span>↗</span>

          </a>


          <p className="venue-address">
            Haji Altaf Pakwan Centre · Ruqaiya Square,
            Pakistan Avenue,
            <br />
            Federal B Area, Karachi
          </p>

        </section>



        {/* WHATSAPP RSVP */}

        <section className="rsvp-section section-shell">

          <div className="rsvp-icon">
            <MessageCircle size={28} />
          </div>


          <p className="eyebrow">
            YOUR PRESENCE WOULD MEAN ALOT TO US
          </p>


          <h2>
            Will you
            <br />
            <em>join us?</em>
          </h2>


          <p className="rsvp-copy">
            It would mean so much to have you with us
            on this special evening. Kindly let us know
            if you can make it.
          </p>


          <a
            className="whatsapp-button"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${rsvpText}`}
            target="_blank"
            rel="noreferrer"
          >

            <MessageCircle size={19} />

            RSVP on WhatsApp

          </a>


          <p className="small-gold">
            WE LOOK FORWARD TO CELEBRATING WITH YOU
          </p>

        </section>



        {/* FOOTER */}

        <footer className="footer">

          <div className="footer-star">
            ✦
          </div>


          <p>
            Made with love, for a moment that matters.
          </p>


          <span>
            DESIGNED BY SYEDA ALEENA HASSAN
          </span>

        </footer>

      </div>

    </main>
  );
}


export default App;
