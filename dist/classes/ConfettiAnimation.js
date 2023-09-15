export default class ConfettiAnimation {
    playAnimation() {
        const colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];
        function createConfetti() {
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.left = Math.random() * window.innerWidth - 20 + "px";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(confetti);
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 2000);
        }
        setInterval(createConfetti, 100);
    }
}
