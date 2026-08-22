export function LoginScreen({ onLogin, error }) {
  return (
    <section className="screen login-screen">
      <div className="login-content">
        <h1 className="wordmark">
          MUSIC
          <br />
          MOOD
          <br />
          APP
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
