import { EnergeticIllustration, RomanticIllustration, ChillIllustration } from "./illustrations.jsx";

export function LoginScreen({ onLogin, error }) {
  return (
    <section className="screen login-screen">
      <div className="login-decor" aria-hidden="true">
        <div className="login-polaroid p1">
          <div className="login-polaroid-scene" style={{ background: "#F5B971" }}>
            <EnergeticIllustration className="mood-tile-illustration" />
          </div>
        </div>
        <div className="login-polaroid p2">
          <div className="login-polaroid-scene" style={{ background: "#F5B0CB" }}>
            <RomanticIllustration className="mood-tile-illustration" />
          </div>
        </div>
        <div className="login-polaroid p3">
          <div className="login-polaroid-scene" style={{ background: "#AAC4FF" }}>
            <ChillIllustration className="mood-tile-illustration" />
          </div>
        </div>
      </div>

      <div className="login-content">
        <h1 className="wordmark">
          SNAPSHOT
          <br />
          RADIO
        </h1>
        <p className="tagline">
          Every color is its own mood.
          <br />
          Every mood has its own music.
        </p>
        <button className="btn-connect" onClick={onLogin}>
          <span>Connect Spotify</span>
        </button>
        <p className="login-note">Spotify Premium is required for playback</p>
        {error && <p className="status-message error">{error}</p>}
      </div>
    </section>
  );
}