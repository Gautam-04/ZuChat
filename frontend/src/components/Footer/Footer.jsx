/* eslint-disable react/no-unescaped-entities */
import './Footer.css'

function Footer() {
  return (
    <section className="footer">
      <div className="footer-heading">
        <div className="footer-title">TaxSarthi</div>
        <div className="footer-icons">
          <a
            className="mail_icon"
            href="mailto:hello@taxsaarthi.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              height="30px"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0iTGF5ZXJfMSIgeD0iMCIgeT0iMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjY1LjUgMTk5IiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNjUuNSAxOTkiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiMwMGIzOWZ9PC9zdHlsZT48cGF0aCBkPSJNMjYwLjQsNjUuN2MyLTEuNiw1LTAuMSw1LDIuNHYxMDZjMCwxMy43LTExLjEsMjQuOS0yNC45LDI0LjlIMjQuOUMxMS4yLDE5OSwwLDE4Ny45LDAsMTc0LjF2LTEwNgljMC0yLjYsMy00LDUtMi40YzExLjYsOSwyNywyMC41LDc5LjksNTguOWMxMC45LDgsMjkuNCwyNC44LDQ3LjgsMjQuN2MxOC41LDAuMiwzNy4zLTE3LDQ3LjgtMjQuNwlDMjMzLjQsODYuMiwyNDguOCw3NC43LDI2MC40LDY1Ljd6IE0xMzIuNywxMzIuN2MxMiwwLjIsMjkuMy0xNS4xLDM4LjEtMjEuNWM2OC44LTQ5LjksNzQtNTQuMyw4OS45LTY2LjdjMy0yLjMsNC44LTYsNC44LTkuOHYtOS44CWMwLTEzLjctMTEuMS0yNC45LTI0LjktMjQuOUgyNC45QzExLjIsMCwwLDExLjEsMCwyNC45djkuOGMwLDMuOCwxLjgsNy40LDQuOCw5LjhjMTUuOSwxMi40LDIxLjEsMTYuOCw4OS45LDY2LjcJQzEwMy40LDExNy41LDEyMC43LDEzMi45LDEzMi43LDEzMi43TDEzMi43LDEzMi43eiIgY2xhc3M9InN0MCIvPjwvc3ZnPg=="
              alt="mail"
            />
          </a>
          <a href="/">
            <img
              className="slack"
              height="30px"
              src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtOC44NDMgMTIuNjUxYy0xLjM5MiAwLTIuNTIxIDEuMTI5LTIuNTIxIDIuNTIxdjYuMzA2YzAgMS4zOTIgMS4xMjkgMi41MjEgMi41MjEgMi41MjFzMi41MjEtMS4xMjkgMi41MjEtMi41MjF2LTYuMzA2Yy0uMDAxLTEuMzkyLTEuMTMtMi41MjEtMi41MjEtMi41MjF6IiBmaWxsPSIjZTkxZTYzIi8+PHBhdGggZD0ibS4wMTkgMTUuMTcyYzAgMS4zOTMgMS4xMyAyLjUyMyAyLjUyMyAyLjUyM3MyLjUyMy0xLjEzIDIuNTIzLTIuNTIzdi0yLjUyM2gtMi41MjFjLS4wMDEgMC0uMDAxIDAtLjAwMiAwLTEuMzkzIDAtMi41MjMgMS4xMy0yLjUyMyAyLjUyM3oiIGZpbGw9IiNlOTFlNjMiLz48cGF0aCBkPSJtOC44NDYtLjAwMWMtLjAwMSAwLS4wMDIgMC0uMDAzIDAtMS4zOTMgMC0yLjUyMyAxLjEzLTIuNTIzIDIuNTIzczEuMTMgMi41MjMgMi41MjMgMi41MjNoMi41MjF2LTIuNTIzYzAtLjAwMSAwLS4wMDMgMC0uMDA1LS4wMDEtMS4zOTEtMS4xMjgtMi41MTgtMi41MTgtMi41MTh6IiBmaWxsPSIjMDBiY2Q0Ii8+PHBhdGggZD0ibTIuNTI1IDExLjM3aDYuMzE4YzEuMzkzIDAgMi41MjMtMS4xMyAyLjUyMy0yLjUyM3MtMS4xMy0yLjUyMy0yLjUyMy0yLjUyM2gtNi4zMThjLTEuMzkzIDAtMi41MjMgMS4xMy0yLjUyMyAyLjUyM3MxLjEzIDIuNTIzIDIuNTIzIDIuNTIzeiIgZmlsbD0iIzAwYmNkNCIvPjxwYXRoIGQ9Im0yMS40NTcgNi4zMjNjLTEuMzkxIDAtMi41MTggMS4xMjctMi41MTggMi41MTh2LjAwNSAyLjUyM2gyLjUyMWMxLjM5MyAwIDIuNTIzLTEuMTMgMi41MjMtMi41MjNzLTEuMTMtMi41MjMtMi41MjMtMi41MjNjLS4wMDEgMC0uMDAyIDAtLjAwMyAweiIgZmlsbD0iIzRjYWY1MCIvPjxwYXRoIGQ9Im0xMi42NDEgMi41MjJ2Ni4zMjVjMCAxLjM5MiAxLjEyOSAyLjUyMSAyLjUyMSAyLjUyMXMyLjUyMS0xLjEyOSAyLjUyMS0yLjUyMXYtNi4zMjVjMC0xLjM5Mi0xLjEyOS0yLjUyMS0yLjUyMS0yLjUyMS0xLjM5MiAwLTIuNTIxIDEuMTI5LTIuNTIxIDIuNTIxeiIgZmlsbD0iIzRjYWY1MCIvPjxnIGZpbGw9IiNmZjk4MDAiPjxwYXRoIGQ9Im0xNy42ODIgMjEuNDc2YzAtMS4zOTItMS4xMjktMi41MjEtMi41MjEtMi41MjFoLTIuNTIxdjIuNTIzYy4wMDEgMS4zOTEgMS4xMjkgMi41MTkgMi41MjEgMi41MTlzMi41MjEtMS4xMjkgMi41MjEtMi41MjF6Ii8+PHBhdGggZD0ibTIxLjQ3OSAxMi42NDloLTYuMzE4Yy0xLjM5MyAwLTIuNTIzIDEuMTMtMi41MjMgMi41MjNzMS4xMyAyLjUyMyAyLjUyMyAyLjUyM2g2LjMxOGMxLjM5MyAwIDIuNTIzLTEuMTMgMi41MjMtMi41MjNzLTEuMTMtMi41MjMtMi41MjMtMi41MjN6Ii8+PC9nPjwvc3ZnPg=="
              alt="slack"
            />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            <img
              className="twitter"
              height="30px"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0iQ2FwYV8xIiB4PSIwIiB5PSIwIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIj48cGF0aCBzdHlsZT0iZmlsbDojMDNhOWY0IiBkPSJNNTEyLDk3LjI0OGMtMTkuMDQsOC4zNTItMzkuMzI4LDEzLjg4OC02MC40OCwxNi41NzZjMjEuNzYtMTIuOTkyLDM4LjM2OC0zMy40MDgsNDYuMTc2LTU4LjAxNgljLTIwLjI4OCwxMi4wOTYtNDIuNjg4LDIwLjY0LTY2LjU2LDI1LjQwOEM0MTEuODcyLDYwLjcwNCwzODQuNDE2LDQ4LDM1NC40NjQsNDhjLTU4LjExMiwwLTEwNC44OTYsNDcuMTY4LTEwNC44OTYsMTA0Ljk5MgljMCw4LjMyLDAuNzA0LDE2LjMyLDIuNDMyLDIzLjkzNmMtODcuMjY0LTQuMjU2LTE2NC40OC00Ni4wOC0yMTYuMzUyLTEwOS43OTJjLTkuMDU2LDE1LjcxMi0xNC4zNjgsMzMuNjk2LTE0LjM2OCw1My4wNTYJYzAsMzYuMzUyLDE4LjcyLDY4LjU3Niw0Ni42MjQsODcuMjMyYy0xNi44NjQtMC4zMi0zMy40MDgtNS4yMTYtNDcuNDI0LTEyLjkyOGMwLDAuMzIsMCwwLjczNiwwLDEuMTUyCWMwLDUxLjAwOCwzNi4zODQsOTMuMzc2LDg0LjA5NiwxMDMuMTM2Yy04LjU0NCwyLjMzNi0xNy44NTYsMy40NTYtMjcuNTIsMy40NTZjLTYuNzIsMC0xMy41MDQtMC4zODQtMTkuODcyLTEuNzkyCWMxMy42LDQxLjU2OCw1Mi4xOTIsNzIuMTI4LDk4LjA4LDczLjEyYy0zNS43MTIsMjcuOTM2LTgxLjA1Niw0NC43NjgtMTMwLjE0NCw0NC43NjhjLTguNjA4LDAtMTYuODY0LTAuMzg0LTI1LjEyLTEuNDQJQzQ2LjQ5Niw0NDYuODgsMTAxLjYsNDY0LDE2MS4wMjQsNDY0YzE5My4xNTIsMCwyOTguNzUyLTE2MCwyOTguNzUyLTI5OC42ODhjMC00LjY0LTAuMTYtOS4xMi0wLjM4NC0xMy41NjgJQzQ4MC4yMjQsMTM2Ljk2LDQ5Ny43MjgsMTE4LjQ5Niw1MTIsOTcuMjQ4eiIvPjwvc3ZnPg=="
              alt="twitter"
            />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <img
              className="linkedin"
              height="30px"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHg9IjAiIHk9IjAiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0iIzA2OSIgZD0ibTQ3NS4wNzQyMTkgMGgtNDM4LjE0ODQzOGMtMjAuMzk0NTMxIDAtMzYuOTI1NzgxIDE2LjUzMTI1LTM2LjkyNTc4MSAzNi45MjU3ODF2NDM4LjE0ODQzOGMwIDIwLjM5NDUzMSAxNi41MzEyNSAzNi45MjU3ODEgMzYuOTI1NzgxIDM2LjkyNTc4MWg0MzguMTQ4NDM4YzIwLjM5NDUzMSAwIDM2LjkyNTc4MS0xNi41MzEyNSAzNi45MjU3ODEtMzYuOTI1Nzgxdi00MzguMTQ4NDM4YzAtMjAuMzk0NTMxLTE2LjUzMTI1LTM2LjkyNTc4MS0zNi45MjU3ODEtMzYuOTI1Nzgxem0tMjkzLjQ2NDg0NCAzODdoLTYyLjM0NzY1NnYtMTg3LjU3NDIxOWg2Mi4zNDc2NTZ6bS0zMS4xNzE4NzUtMjEzLjE4NzVoLS40MDYyNWMtMjAuOTIxODc1IDAtMzQuNDUzMTI1LTE0LjQwMjM0NC0zNC40NTMxMjUtMzIuNDAyMzQ0IDAtMTguNDA2MjUgMTMuOTQ1MzEzLTMyLjQxMDE1NiAzNS4yNzM0MzctMzIuNDEwMTU2IDIxLjMyODEyNiAwIDM0LjQ1MzEyNiAxNC4wMDM5MDYgMzQuODU5Mzc2IDMyLjQxMDE1NiAwIDE4LTEzLjUzMTI1IDMyLjQwMjM0NC0zNS4yNzM0MzggMzIuNDAyMzQ0em0yNTUuOTg0Mzc1IDIxMy4xODc1aC02Mi4zMzk4NDR2LTEwMC4zNDc2NTZjMC0yNS4yMTg3NS05LjAyNzM0My00Mi40MTc5NjktMzEuNTg1OTM3LTQyLjQxNzk2OS0xNy4yMjI2NTYgMC0yNy40ODA0NjkgMTEuNjAxNTYzLTMxLjk4ODI4MiAyMi44MDA3ODEtMS42NDg0MzcgNC4wMDc4MTMtMi4wNTA3ODEgOS42MDkzNzUtMi4wNTA3ODEgMTUuMjE0ODQ0djEwNC43NWgtNjIuMzQzNzVzLjgxNjQwNy0xNjkuOTc2NTYyIDAtMTg3LjU3NDIxOWg2Mi4zNDM3NXYyNi41NTg1OTRjOC4yODUxNTctMTIuNzgxMjUgMjMuMTA5Mzc1LTMwLjk2MDkzNyA1Ni4xODc1LTMwLjk2MDkzNyA0MS4wMTk1MzEgMCA3MS43NzczNDQgMjYuODA4NTkzIDcxLjc3NzM0NCA4NC40MjE4NzR6bTAgMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIvPjwvZz48L3N2Zz4="
              alt="linkedin"
            />
          </a>
          <a
            className="youtube_icon"
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="youtube"
              height="30px"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0iTGF5ZXJfMSIgeD0iMCIgeT0iMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDM1OC41IiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgMzU4LjUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOnJlZH0uc3Qxe2ZpbGw6I2ZmZn08L3N0eWxlPjxwYXRoIGQ9Ik01MDEuNSw1Ni4xYy01LjktMjEuOS0yMy4yLTM5LjItNDUuMS00NS4xQzQxNi4zLDAsMjU2LDAsMjU2LDBTOTUuNywwLDU1LjcsMTAuNQljLTIxLjUsNS45LTM5LjIsMjMuNi00NS4xLDQ1LjVDMCw5Ni4yLDAsMTc5LjIsMCwxNzkuMnMwLDgzLjUsMTAuNSwxMjMuMWM1LjksMjEuOSwyMy4yLDM5LjIsNDUuMSw0NS4xYzQwLjUsMTEsMjAwLjMsMTEsMjAwLjMsMTEJczE2MC4zLDAsMjAwLjMtMTAuNWMyMS45LTUuOSwzOS4yLTIzLjIsNDUuMS00NS4xQzUxMiwyNjIuNyw1MTIsMTc5LjcsNTEyLDE3OS43UzUxMi40LDk2LjIsNTAxLjUsNTYuMXoiIGNsYXNzPSJzdDAiLz48cGF0aCBkPSJNMjA1LDI1NmwxMzMuMy03Ni44TDIwNSwxMDIuNVYyNTZ6IiBjbGFzcz0ic3QxIi8+PC9zdmc+"
              alt="youtube"
            />
          </a>
        </div>
      </div>
      <div className="footer-info">
        <div className="footer-desc">
          The <span className='footerDescSpan'>collaboration platform{" "}</span>
for securely handling your  sensitive and personal data
        </div>
        <div className="footer-section">
          <div className="footer-resources">
            <div className="footer-section-title">Resources</div>
            <ul>
              <li>
                <a href="/">LINK</a>
              </li>
              <li>
                <a href="/">LINK</a>
              </li>
              <li>
                <a href="/">LINK</a>
              </li>
              <li>
                <a href="/">LINK</a>
              </li>
              <li>
                <a href="/">LINK</a>
              </li>
            </ul>
          </div>
          <div className="footer-company">
            <div className="footer-section-title">Company</div>
            <ul>
              <li>
                <a href="/">LINK</a>
              </li>
              <li>
                <a href="/">LINK</a>
              </li>
              <li>
                <a href="/">LINK</a>
              </li>
              <li>
                <a href="/">LINK</a>
              </li>
              <li>
                <a href="/">LINK</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>
            <script>document.write(new Date().getFullYear())</script>
            Copyright ZuChat, Inc | All Rights Reserved
          </p>
        </div>
        <div className="footer-bottom-right">
          <p>
            <span>
              <a href="/">Privacy</a>
            </span>{" "}
            &nbsp;{" "}
            <span>
              <a href="/">Terms</a>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Footer