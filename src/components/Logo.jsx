/**
 * Fixed top-left brand mark - a small network-node glyph. Links back to the
 * top of the page. Sits over whatever the WebGL background shows through;
 * no background, border, or shadow of its own.
 */
function Logo() {
  return (
    <a className="logo" href="#hero" aria-label="Wu Jinhan, home">
      <svg
        className="logo__mark"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="14" y1="14" x2="5" y2="7" />
          <line x1="14" y1="14" x2="23" y2="9" />
          <line x1="14" y1="14" x2="13" y2="24" />
          <line x1="5" y1="7" x2="23" y2="9" />
        </g>
        <g fill="currentColor">
          <circle cx="5" cy="7" r="1.9" />
          <circle cx="23" cy="9" r="1.9" />
          <circle cx="13" cy="24" r="1.9" />
          <rect
            x="10.6"
            y="10.6"
            width="6.8"
            height="6.8"
            rx="1"
            transform="rotate(45 14 14)"
          />
        </g>
      </svg>
    </a>
  )
}

export default Logo
