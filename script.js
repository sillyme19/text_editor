document.addEventListener('DOMContentLoaded', () => {
    const fontName = document.getElementById('fontName');
    const fontSize = document.getElementById('fontSize');
    const textInput = document.getElementById('text-input');
    const italicToggle = document.getElementById('italicToggle');
  
    const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Georgia', 'Courier New', 'Cursive', 'Monospace'];
    const sizes = [1, 2, 3, 4, 5, 6, 7];
  
    const fontsWithItalics = ['Arial', 'Verdana', 'Georgia', 'Courier New'];
  
    // Load saved content and settings from localStorage
    loadContent();
  
    fonts.forEach(font => {
      let option = document.createElement('option');
      option.value = font;
      option.innerText = font;
      fontName.appendChild(option);
    });
  
    sizes.forEach(size => {
      let option = document.createElement('option');
      option.value = size;
      option.innerText = size;
      fontSize.appendChild(option);
    });
  
    fontName.addEventListener('change', () => {
      document.execCommand('fontName', false, fontName.value);
      checkItalicSupport(fontName.value);
      saveContent();
    });
  
    fontSize.addEventListener('change', () => {
      document.execCommand('fontSize', false, fontSize.value);
      saveContent();
    });
  
    italicToggle.addEventListener('change', () => {
      document.execCommand('italic', false, italicToggle.checked);
      saveContent();
    });
  
    document.getElementById('bold').addEventListener('click', () => {
      document.execCommand('bold', false, null);
      saveContent();
    });
  
    document.getElementById('underline').addEventListener('click', () => {
      document.execCommand('underline', false, null);
      saveContent();
    });
  
    textInput.addEventListener('input', () => {
      saveContent();
    });
  
    function checkItalicSupport(font) {
      if (fontsWithItalics.includes(font)) {
        italicToggle.checked = true;
        italicToggle.disabled = false;
        document.execCommand('italic', false, true);
      } else {
        italicToggle.checked = false;
        italicToggle.disabled = true;
        document.execCommand('italic', false, false);
      }
    }
  
    function saveContent() {
      localStorage.setItem('textContent', textInput.innerHTML);
      localStorage.setItem('fontName', fontName.value);
      localStorage.setItem('fontSize', fontSize.value);
      localStorage.setItem('italicChecked', italicToggle.checked);
    }
  
    function loadContent() {
      const savedText = localStorage.getItem('textContent');
      const savedFontName = localStorage.getItem('fontName');
      const savedFontSize = localStorage.getItem('fontSize');
      const savedItalicChecked = localStorage.getItem('italicChecked');
  
      if (savedText) textInput.innerHTML = savedText;
      if (savedFontName) {
        fontName.value = savedFontName;
        document.execCommand('fontName', false, savedFontName);
        checkItalicSupport(savedFontName);
      }
      if (savedFontSize) {
        fontSize.value = savedFontSize;
        document.execCommand('fontSize', false, savedFontSize);
      }
      if (savedItalicChecked !== null) {
        italicToggle.checked = JSON.parse(savedItalicChecked);
        document.execCommand('italic', false, italicToggle.checked);
      }
    }
  });
