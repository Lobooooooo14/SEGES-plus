const constants = {
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$.%^&*])[^\s]{6,}$/,
  emailRegex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  segesBaseURL: "https://segespais.caedufjf.net/seges",
  TosUrl: {
    raw: "https://raw.githubusercontent.com/Lobooooooo14/SEGES-plus/main/TERMS_OF_SERVICE.md",
    github:
      "https://github.com/Lobooooooo14/SEGES-plus/blob/main/TERMS_OF_SERVICE.md"
  },
  PrivacyUrl: {
    raw: "https://raw.githubusercontent.com/Lobooooooo14/SEGES-plus/main/PRIVACY_POLICY.md",
    github:
      "https://github.com/Lobooooooo14/SEGES-plus/blob/main/PRIVACY_POLICY.md"
  }
}

export default constants
