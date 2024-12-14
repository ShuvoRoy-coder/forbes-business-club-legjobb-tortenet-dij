module.exports = {
  content: [
    "index.php",
    "application.php",
    "components/*.php",
    "components/voting/*.php",
  ],
  css: ["./assets/build/styles/app.css"],
  output: "./assets/build/styles",
  safelist: [/grecaptcha/],
};
