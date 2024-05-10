  const text = document.getElementById("text");
  const speak = document.getElementById("speak");
  const voiceSelect = document.getElementById("voiceSelect");

  // Here I create an empty array to store the voices
  let voices = [];

  // This function populates the voice list with the available voices on the system and sets the selected voice
  function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = voices[i].name + " (" + voices[i].lang + ")";
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  // When the speak button is clicked, create a new SpeechSynthesisUtterance and set the text, volume, rate, pitch and voice
  speak.addEventListener("click", () => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text.value;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    // Set the selected voice
    const selectedOption = voiceSelect.selectedOptions[0];
    const selectedVoice = voices.find(
      (voice) => voice.name === selectedOption.getAttribute("data-name")
    );
    speech.voice = selectedVoice;
    // Speak the text
    window.speechSynthesis.speak(speech);
  });

  // Populate voices within the select element
  speechSynthesis.onvoiceschanged = populateVoiceList;