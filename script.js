function showSection(sectionName) {
  var sections = ["loginSection", "registerSection", "userSection", "orgSection"];
  for (var i = 0; i < sections.length; i++) {
    if (sections[i] == sectionName) {
      document.getElementById(sectionName).style.display = "block";
    } else {
      document.getElementById(sections[i]).style.display = "none";
    }
  }
}