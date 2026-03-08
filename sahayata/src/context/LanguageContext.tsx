import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'English' | 'Hindi' | 'Marathi' | 'Punjabi';

interface Translations {
  [key: string]: {
    [K in Language]: string;
  };
}

export const translations: Translations = {
  // Navbar
  home: { English: 'Home', Hindi: 'होम', Marathi: 'होम', Punjabi: 'ਹੋਮ' },
  howItWorks: { English: 'How it Works', Hindi: 'यह कैसे काम करता है', Marathi: 'हे कसे कार्य करते', Punjabi: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ' },
  checkEligibility: { English: 'Check Eligibility', Hindi: 'पात्रता जांचें', Marathi: 'पात्रता तपासा', Punjabi: 'ਪਾਤਰਤਾ ਦੀ ਜਾਂਚ ਕਰੋ' },
  whatsappHelp: { English: 'WhatsApp Help', Hindi: 'व्हाट्सएप सहायता', Marathi: 'व्हॉट्सॲप मदत', Punjabi: 'ਵਟਸਐਪ ਸਹਾਇਤਾ' },
  
  // Home
  heroTitle: { English: 'SahaYata', Hindi: 'सहायता', Marathi: 'सहायता', Punjabi: 'ਸਹਾਇਤਾ' },
  heroSubtitle: { English: 'Farmer Welfare Scheme Assistant. Helping you grow with the right government support.', Hindi: 'किसान कल्याण योजना सहायक। सही सरकारी सहायता के साथ आपको बढ़ने में मदद करना।', Marathi: 'शेतकरी कल्याण योजना सहाय्यक. योग्य सरकारी पाठिंब्याने तुम्हाला वाढण्यास मदत करणे.', Punjabi: 'ਕਿਸਾਨ ਭਲਾਈ ਸਕੀਮ ਸਹਾਇਕ। ਸਹੀ ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਨਾਲ ਤੁਹਾਨੂੰ ਵਧਣ ਵਿੱਚ ਮਦਦ ਕਰਨਾ।' },
  checkButton: { English: 'Check Scheme Eligibility', Hindi: 'योजना पात्रता जांचें', Marathi: 'योजना पात्रता तपासा', Punjabi: 'ਸਕੀਮ ਦੀ ਪਾਤਰਤਾ ਦੀ ਜਾਂਚ ਕਰੋ' },
  whatsappButton: { English: 'Get Help on WhatsApp', Hindi: 'व्हाट्सएप पर सहायता प्राप्त करें', Marathi: 'व्हॉट्सॲपवर मदत मिळवा', Punjabi: 'ਵਟਸਐਪ ਤੇ ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰੋ' },
  feature1Title: { English: 'Smart Analysis', Hindi: 'स्मार्ट विश्लेषण', Marathi: 'स्मार्ट विश्लेषण', Punjabi: 'ਸਮਾਰਟ ਵਿਸ਼ਲੇਸ਼ਣ' },
  feature1Desc: { English: 'We analyze your land size and location to find the best schemes.', Hindi: 'हम सर्वोत्तम योजनाएं खोजने के लिए आपके भूमि आकार और स्थान का विश्लेषण करते हैं।', Marathi: 'आम्ही सर्वोत्तम योजना शोधण्यासाठी तुमच्या जमिनीचा आकार आणि स्थानाचे विश्लेषण करतो.', Punjabi: 'ਅਸੀਂ ਸਭ ਤੋਂ ਵਧੀਆ ਸਕੀਮਾਂ ਲੱਭਣ ਲਈ ਤੁਹਾਡੀ ਜ਼ਮੀਨ ਦੇ ਆਕਾਰ ਅਤੇ ਸਥਾਨ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਦੇ ਹਾਂ।' },
  feature2Title: { English: 'Crop Support', Hindi: 'फसल सहायता', Marathi: 'पीक आधार', Punjabi: 'ਫਸਲ ਸਹਾਇਤਾ' },
  feature2Desc: { English: 'Get information about subsidies for seeds, fertilizers, and more.', Hindi: 'बीज, उर्वरक और अन्य के लिए सब्सिडी के बारे में जानकारी प्राप्त करें।', Marathi: 'बियाणे, खते आणि अधिकसाठी अनुदानाबद्दल माहिती मिळवा.', Punjabi: 'ਬੀਜਾਂ, ਖਾਦਾਂ ਅਤੇ ਹੋਰ ਚੀਜ਼ਾਂ ਲਈ ਸਬਸਿਡੀਆਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ।' },
  feature3Title: { English: 'Irrigation Help', Hindi: 'सिंचाई सहायता', Marathi: 'सिंचन मदत', Punjabi: 'ਸਿੰਚਾਈ ਸਹਾਇਤਾ' },
  feature3Desc: { English: 'Find schemes for water management and modern irrigation tools.', Hindi: 'जल प्रबंधन और आधुनिक सिंचाई उपकरणों के लिए योजनाएं खोजें।', Marathi: 'पाणी व्यवस्थापन आणि आधुनिक सिंचन साधनांसाठी योजना शोधा.', Punjabi: 'ਪਾਣੀ ਦੇ ਪ੍ਰਬੰਧਨ ਅਤੇ ਆਧੁਨਿਕ ਸਿੰਚਾਈ ਸਾਧਨਾਂ ਲਈ ਸਕੀਮਾਂ ਲੱਭੋ।' },

  // How it Works
  howItWorksTitle: { English: 'How SahaYata Works', Hindi: 'सहायता कैसे काम करती है', Marathi: 'सहायता कसे कार्य करते', Punjabi: 'ਸਹਾਇਤਾ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ' },
  howItWorksSubtitle: { English: 'Four simple steps to find your welfare schemes.', Hindi: 'आपकी कल्याणकारी योजनाएं खोजने के लिए चार सरल कदम।', Marathi: 'तुमच्या कल्याणकारी योजना शोधण्यासाठी चार सोप्या पायऱ्या.', Punjabi: 'ਤੁਹਾਡੀਆਂ ਭਲਾਈ ਸਕੀਮਾਂ ਲੱਭਣ ਲਈ ਚਾਰ ਸਧਾਰਨ ਕਦਮ।' },
  step1Title: { English: 'Step 1 – Enter Farmer Details', Hindi: 'चरण 1 - किसान विवरण दर्ज करें', Marathi: 'पायरी 1 - शेतकरी तपशील प्रविष्ट करा', Punjabi: 'ਕਦਮ 1 - ਕਿਸਾਨ ਦੇ ਵੇਰਵੇ ਦਰਜ ਕਰੋ' },
  step1Desc: { English: 'The farmer enters basic information such as name, land size, and location.', Hindi: 'किसान नाम, भूमि का आकार और स्थान जैसी बुनियादी जानकारी दर्ज करता है।', Marathi: 'शेतकरी नाव, जमिनीचा आकार आणि स्थान यासारखी मूलभूत माहिती प्रविष्ट करतो.', Punjabi: 'ਕਿਸਾਨ ਮੁੱਢਲੀ ਜਾਣਕਾਰੀ ਜਿਵੇਂ ਕਿ ਨਾਮ, ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ ਅਤੇ ਸਥਾਨ ਦਰਜ ਕਰਦਾ ਹੈ।' },
  step2Title: { English: 'Step 2 – System Checks Data', Hindi: 'चरण 2 - सिस्टम डेटा की जांच करता है', Marathi: 'पायरी 2 - सिस्टम डेटा तपासते', Punjabi: 'ਕਦਮ 2 - ਸਿਸਟਮ ਡੇਟਾ ਦੀ ਜਾਂਚ ਕਰਦਾ ਹੈ' },
  step2Desc: { English: 'The system connects to government scheme databases to verify information.', Hindi: 'सिस्टम जानकारी सत्यापित करने के लिए सरकारी योजना डेटाबेस से जुड़ता है।', Marathi: 'माहिती सत्यापित करण्यासाठी सिस्टम सरकारी योजना डेटाबेसशी जोडते.', Punjabi: 'ਸਿਸਟਮ ਜਾਣਕਾਰੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨ ਲਈ ਸਰਕਾਰੀ ਸਕੀਮ ਡੇਟਾਬੇਸ ਨਾਲ ਜੁੜਦਾ ਹੈ।' },
  step3Title: { English: 'Step 3 – Eligibility Check', Hindi: 'चरण 3 - पात्रता जांच', Marathi: 'पायरी 3 - पात्रता तपासणी', Punjabi: 'ਕਦਮ 3 - ਪਾਤਰਤਾ ਦੀ ਜਾਂਚ' },
  step3Desc: { English: 'The platform checks which schemes the farmer can apply for based on profile.', Hindi: 'प्लेटफॉर्म प्रोफाइल के आधार पर जांचता है कि किसान किन योजनाओं के लिए आवेदन कर सकता है।', Marathi: 'प्रोफाइलच्या आधारे शेतकरी कोणत्या योजनांसाठी अर्ज करू शकतो हे प्लॅटफॉर्म तपासते.', Punjabi: 'ਪਲੇਟਫਾਰਮ ਜਾਂਚ ਕਰਦਾ ਹੈ ਕਿ ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ ਦੇ ਆਧਾਰ ਤੇ ਕਿਹੜੀਆਂ ਸਕੀਮਾਂ ਲਈ ਅਰਜ਼ੀ ਦੇ ਸਕਦਾ ਹੈ।' },
  step4Title: { English: 'Step 4 – Show Results', Hindi: 'चरण 4 - परिणाम दिखाएं', Marathi: 'पायरी 4 - निकाल दाखवा', Punjabi: 'ਕਦਮ 4 - ਨਤੀਜੇ ਦਿਖਾਓ' },
  step4Desc: { English: 'The website shows all useful schemes with direct links to apply.', Hindi: 'वेबसाइट आवेदन करने के लिए सीधे लिंक के साथ सभी उपयोगी योजनाएं दिखाती है।', Marathi: 'वेबसाइट अर्ज करण्यासाठी थेट लिंकसह सर्व उपयुक्त योजना दर्शवते.', Punjabi: 'ਵੈੱਬਸਾਈਟ ਅਪਲਾਈ ਕਰਨ ਲਈ ਸਿੱਧੇ ਲਿੰਕਾਂ ਦੇ ਨਾਲ ਸਾਰੀਆਂ ਉਪਯੋਗੀ ਸਕੀਮਾਂ ਦਿਖਾਉਂਦੀ ਹੈ।' },

  // Form
  formTitle: { English: 'Farmer Eligibility Form', Hindi: 'किसान पात्रता फॉर्म', Marathi: 'शेतकरी पात्रता फॉर्म', Punjabi: 'ਕਿਸਾਨ ਪਾਤਰਤਾ ਫਾਰਮ' },
  formSubtitle: { English: 'Please provide your details to check available government schemes.', Hindi: 'उपलब्ध सरकारी योजनाओं की जांच के लिए कृपया अपना विवरण प्रदान करें।', Marathi: 'कृपया उपलब्ध सरकारी योजना तपासण्यासाठी तुमचे तपशील प्रदान करा.', Punjabi: 'ਉਪਲਬਧ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਦੀ ਜਾਂਚ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਵੇਰਵੇ ਪ੍ਰਦਾਨ ਕਰੋ।' },
  aadhaarLabel: { English: 'Aadhaar Number', Hindi: 'आधार नंबर', Marathi: 'आधार क्रमांक', Punjabi: 'ਆਧਾਰ ਨੰਬਰ' },
  nameLabel: { English: 'Farmer Name', Hindi: 'किसान का नाम', Marathi: 'शेतकऱ्याचे नाव', Punjabi: 'ਕਿਸਾਨ ਦਾ ਨਾਮ' },
  phoneLabel: { English: 'Phone Number', Hindi: 'फ़ोन नंबर', Marathi: 'फोन नंबर', Punjabi: 'ਫੋਨ ਨੰਬਰ' },
  ageLabel: { English: 'Age', Hindi: 'आयु', Marathi: 'वय', Punjabi: 'ਉਮਰ' },
  stateLabel: { English: 'State', Hindi: 'राज्य', Marathi: 'राज्य', Punjabi: 'ਰਾਜ' },
  districtLabel: { English: 'District', Hindi: 'ज़िला', Marathi: 'जिल्हा', Punjabi: 'ਜ਼ਿਲ੍ਹਾ' },
  farmSizeLabel: { English: 'Farm Size (in acres)', Hindi: 'खेत का आकार (एकड़ में)', Marathi: 'शेतीचा आकार (एकरमध्ये)', Punjabi: 'ਫਾਰਮ ਦਾ ਆਕਾਰ (ਏਕੜ ਵਿੱਚ)' },
  languageLabel: { English: 'Preferred Language', Hindi: 'पसंदीदा भाषा', Marathi: 'पसंतीची भाषा', Punjabi: 'ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ' },
  submitButton: { English: 'Submit Details', Hindi: 'विवरण जमा करें', Marathi: 'तपशील सबमिट करा', Punjabi: 'ਵੇਰਵੇ ਜਮ੍ਹਾਂ ਕਰੋ' },

  // Processing
  processingTitle: { English: 'Processing...', Hindi: 'प्रसंस्करण हो रहा है...', Marathi: 'प्रक्रिया सुरू आहे...', Punjabi: 'ਪ੍ਰੋਸੈਸਿੰਗ ਹੋ ਰਹੀ ਹੈ...' },
  msg1: { English: 'Checking farmer information...', Hindi: 'किसान की जानकारी जांची जा रही है...', Marathi: 'शेतकऱ्याची माहिती तपासली जात आहे...', Punjabi: 'ਕਿਸਾਨ ਦੀ ਜਾਣਕਾਰੀ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...' },
  msg2: { English: 'Connecting to government scheme database...', Hindi: 'सरकारी योजना डेटाबेस से जुड़ रहा है...', Marathi: 'सरकारी योजना डेटाबेसशी कनेक्ट होत आहे...', Punjabi: 'ਸਰਕਾਰੀ ਸਕੀਮ ਡੇਟਾਬੇਸ ਨਾਲ ਜੁੜ ਰਿਹਾ ਹੈ...' },
  msg3: { English: 'Verifying Aadhaar details...', Hindi: 'आधार विवरण सत्यापित किया जा रहा है...', Marathi: 'आधार तपशील सत्यापित करत आहे...', Punjabi: 'ਆਧਾਰ ਵੇਰਵਿਆਂ ਦੀ ਪੁਸ਼ਟੀ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...' },
  msg4: { English: 'Analyzing land records...', Hindi: 'भूमि अभिलेखों का विश्लेषण किया जा रहा है...', Marathi: 'जमिनीच्या नोंदींचे विश्लेषण करत आहे...', Punjabi: 'ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...' },
  msg5: { English: 'Finding eligible programs for you...', Hindi: 'आपके लिए पात्र कार्यक्रम खोजे जा रहे हैं...', Marathi: 'तुमच्यासाठी पात्र कार्यक्रम शोधत आहे...', Punjabi: 'ਤੁਹਾਡੇ ਲਈ ਯੋਗ ਪ੍ਰੋਗਰਾਮ ਲੱਭੇ ਜਾ ਰਹੇ ਹਨ...' },
  msg6: { English: 'Finalizing results...', Hindi: 'परिणामों को अंतिम रूप दिया जा रहा है...', Marathi: 'निकाल अंतिम करत आहे...', Punjabi: 'ਨਤੀਜਿਆਂ ਨੂੰ ਅੰਤਿਮ ਰੂਪ ਦਿੱਤਾ ਜਾ ਰਿਹਾ ਹੈ...' },

  // Results
  resultsTitle: { English: 'Eligibility Results', Hindi: 'पात्रता परिणाम', Marathi: 'पात्रता निकाल', Punjabi: 'ਪਾਤਰਤਾ ਦੇ ਨਤੀਜੇ' },
  resultsSubtitle: { English: 'Based on your profile, you are eligible for the following schemes.', Hindi: 'आपकी प्रोफ़ाइल के आधार पर, आप निम्नलिखित योजनाओं के लिए पात्र हैं।', Marathi: 'तुमच्या प्रोफाइलवर आधारित, तुम्ही खालील योजनांसाठी पात्र आहात.', Punjabi: 'ਤੁਹਾਡੇ ਪ੍ਰੋਫਾਈਲ ਦੇ ਆਧਾਰ ਤੇ, ਤੁਸੀਂ ਹੇਠ ਲਿਖੀਆਂ ਸਕੀਮਾਂ ਲਈ ਯੋਗ ਹੋ।' },
  applyNow: { English: 'Apply Now', Hindi: 'अभी आवेदन करें', Marathi: 'आता अर्ज करा', Punjabi: 'ਹੁਣੇ ਅਪਲਾਈ ਕਰੋ' },
  getOnWhatsapp: { English: 'Get Detailed List on WhatsApp', Hindi: 'व्हाट्सएप पर विस्तृत सूची प्राप्त करें', Marathi: 'व्हॉट्सॲपवर तपशीलवार यादी मिळवा', Punjabi: 'ਵਟਸਐਪ ਤੇ ਵਿਸਤ੍ਰਿਤ ਸੂਚੀ ਪ੍ਰਾਪਤ ਕਰੋ' },
  benefitLabel: { English: 'Benefit', Hindi: 'लाभ', Marathi: 'फायदा', Punjabi: 'ਲਾਭ' },
  documentsLabel: { English: 'Required Documents', Hindi: 'आवश्यक दस्तावेज़', Marathi: 'आवश्यक कागदपत्रे', Punjabi: 'ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼' },
  eligibilityCriteria: { English: 'Eligibility Criteria', Hindi: 'पात्रता मापदंड', Marathi: 'पात्रता निकष', Punjabi: 'ਪਾਤਰਤਾ ਮਾਪਦੰਡ' },
  importantNumbers: { English: 'Important Numbers', Hindi: 'महत्वपूर्ण नंबर', Marathi: 'महत्वाचे नंबर', Punjabi: 'ਮਹੱਤਵਪੂਰਨ ਨੰਬਰ' },
  nearbyCentersTitle: { English: 'Nearby Application Centers', Hindi: 'नज़दीकी आवेदन केंद्र', Marathi: 'जवळपासची अर्ज केंद्रे', Punjabi: 'ਨੇੜਲੇ ਅਰਜ਼ੀ ਕੇਂਦਰ' },
  nearbyCentersSubtitle: { English: 'Visit these local centers (CSC/Maha e-Seva) to fill your application forms.', Hindi: 'अपने आवेदन फॉर्म भरने के लिए इन स्थानीय केंद्रों (सीएससी/महा ई-सेवा) पर जाएं।', Marathi: 'तुमचे अर्ज भरण्यासाठी या स्थानिक केंद्रांना (CSC/मह ई-सेवा) भेट द्या.', Punjabi: 'ਆਪਣੇ ਅਰਜ਼ੀ ਫਾਰਮ ਭਰਨ ਲਈ ਇਹਨਾਂ ਸਥਾਨਕ ਕੇਂਦਰਾਂ (CSC/ਮਹਾ ਈ-ਸੇਵਾ) ਤੇ ਜਾਓ।' },
  viewDetails: { English: 'View Details', Hindi: 'विवरण देखें', Marathi: 'तपशील पहा', Punjabi: 'ਵੇਰਵੇ ਦੇਖੋ' },
  close: { English: 'Close', Hindi: 'बंद करें', Marathi: 'बंद करा', Punjabi: 'ਬੰਦ ਕਰੋ' },
  locationPermissionMsg: { English: 'Please allow location access to find nearby application centers.', Hindi: 'नज़दीकी आवेदन केंद्र खोजने के लिए कृपया स्थान पहुंच की अनुमति दें।', Marathi: 'जवळपासची अर्ज केंद्रे शोधण्यासाठी कृपया स्थान प्रवेशास अनुमती द्या.', Punjabi: 'ਨੇੜਲੇ ਅਰਜ਼ੀ ਕੇਂਦਰਾਂ ਨੂੰ ਲੱਭਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਟਿਕਾਣਾ ਪਹੁੰਚ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ।' },
  noCentersFound: { English: 'No application centers found nearby.', Hindi: 'आस-पास कोई आवेदन केंद्र नहीं मिला।', Marathi: 'जवळपास कोणतेही अर्ज केंद्र सापडले नाही.', Punjabi: 'ਨੇੜੇ ਕੋਈ ਅਰਜ਼ੀ ਕੇਂਦਰ ਨਹੀਂ ਮਿਲਿਆ।' },

  // WhatsApp
  whatsappHelpTitle: { English: 'Need Help? Chat with Us!', Hindi: 'सहायता चाहिए? हमसे चैट करें!', Marathi: 'मदत हवी आहे? आमच्याशी चॅट करा!', Punjabi: 'ਮਦਦ ਚਾਹੀਦੀ ਹੈ? ਸਾਡੇ ਨਾਲ ਗੱਲਬਾਤ ਕਰੋ!' },
  whatsappHelpSubtitle: { English: 'Our SahaYata assistants are available on WhatsApp to help you with scheme applications and any queries.', Hindi: 'हमारे सहायता सहायक योजना आवेदनों और किसी भी प्रश्न में आपकी सहायता के लिए व्हाट्सएप पर उपलब्ध हैं।', Marathi: 'आमचे सहायता सहाय्यक योजना अर्ज आणि कोणत्याही शंकांसाठी तुम्हाला मदत करण्यासाठी व्हॉट्सॲपवर उपलब्ध आहेत.', Punjabi: 'ਸਾਡੇ ਸਹਾਇਤਾ ਸਹਾਇਕ ਸਕੀਮ ਅਰਜ਼ੀਆਂ ਅਤੇ ਕਿਸੇ ਵੀ ਪੁੱਛਗਿੱਛ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਵਟਸਐਪ ਤੇ ਉਪਲਬਧ ਹਨ।' },
  openWhatsapp: { English: 'Open WhatsApp', Hindi: 'व्हाट्सएप खोलें', Marathi: 'व्हॉट्सॲप उघडा', Punjabi: 'ਵਟਸਐਪ ਖੋਲ੍ਹੋ' },
  support247: { English: '24/7 Support', Hindi: '24/7 सहायता', Marathi: '24/7 समर्थन', Punjabi: '24/7 ਸਹਾਇਤਾ' },
  freeAssistance: { English: 'Free Assistance', Hindi: 'नि:शुल्क सहायता', Marathi: 'मोफत मदत', Punjabi: 'ਮੁਫਤ ਸਹਾਇਤਾ' },
  languagesCount: { English: '10+ Languages', Hindi: '10+ भाषाएं', Marathi: '10+ भाषा', Punjabi: '10+ ਭਾਸ਼ਾਵਾਂ' },
  whatsappMsg: { 
    English: 'Hello SahaYata, I need help with farmer schemes.', 
    Hindi: 'नमस्ते सहायता, मुझे किसान योजनाओं में मदद चाहिए।', 
    Marathi: 'नमस्कार सहायता, मला शेतकरी योजनांसाठी मदत हवी आहे.', 
    Punjabi: 'ਨਮਸਤੇ ਸਹਾਇਤਾ, ਮੈਨੂੰ ਕਿਸਾਨ ਸਕੀਮਾਂ ਬਾਰੇ ਮਦਦ ਚਾਹੀਦੀ ਹੈ।' 
  },

  // Scheme 1: PM-KISAN
  scheme1Name: { English: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', Hindi: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)', Marathi: 'प्रधानमंत्री किसान सन्मान निधी (PM-KISAN)', Punjabi: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ (PM-KISAN)' },
  scheme1Desc: { English: 'Direct income support of ₹6,000 per year to all landholding farmer families.', Hindi: 'सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।', Marathi: 'सर्व जमीनधारक शेतकरी कुटुंबांना दरवर्षी ₹6,000 थेट उत्पन्न सहाय्य.', Punjabi: 'ਸਾਰੇ ਜ਼ਮੀਨ ਮਾਲਕ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਪ੍ਰਤੀ ਸਾਲ ₹6,000 ਦੀ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ।' },
  scheme1Benefit: { English: '₹6,000 per year in three equal installments.', Hindi: 'तीन समान किश्तों में ₹6,000 प्रति वर्ष।', Marathi: 'तीन समान हप्त्यांमध्ये दरवर्षी ₹6,000.', Punjabi: 'ਤਿੰਨ ਬਰਾਬਰ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ₹6,000 ਪ੍ਰਤੀ ਸਾਲ।' },
  scheme1Docs: { English: 'Aadhaar Card, Land Holding Papers, Bank Account Details', Hindi: 'आधार कार्ड, भूमि धारण पत्र, बैंक खाता विवरण', Marathi: 'आधार कार्ड, जमीन धारण कागदपत्रे, बँक खाते तपशील', Punjabi: 'ਆਧਾਰ ਕਾਰਡ, ਜ਼ਮੀਨ ਦੇ ਕਾਗਜ਼ਾਤ, ਬੈਂਕ ਖਾਤੇ ਦੇ ਵੇਰਵੇ' },

  // Scheme 2: PMFBY
  scheme2Name: { English: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', Hindi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)', Marathi: 'प्रधानमंत्री पीक विमा योजना (PMFBY)', Punjabi: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ (PMFBY)' },
  scheme2Desc: { English: 'Financial support to farmers suffering crop loss/damage arising out of natural calamities.', Hindi: 'प्राकृतिक आपदाओं से होने वाले फसल नुकसान/क्षति से पीड़ित किसानों को वित्तीय सहायता।', Marathi: 'नैसर्गिक आपत्तींमुळे पिकांचे नुकसान/नुकसान झालेल्या शेतकऱ्यांना आर्थिक मदत.', Punjabi: 'ਕੁਦਰਤੀ ਆਫ਼ਤਾਂ ਕਾਰਨ ਫਸਲਾਂ ਦੇ ਨੁਕਸਾਨ/ਨੁਕਸਾਨ ਤੋਂ ਪੀੜਤ ਕਿਸਾਨਾਂ ਨੂੰ ਵਿੱਤੀ ਸਹਾਇਤਾ।' },
  scheme2Benefit: { English: 'Comprehensive insurance cover against crop failure.', Hindi: 'फसल खराब होने के खिलाफ व्यापक बीमा कवर।', Marathi: 'पीक अपयशाविरुद्ध सर्वसमावेशक विमा संरक्षण.', Punjabi: 'ਫਸਲ ਦੀ ਬਰਬਾਦੀ ਵਿਰੁੱਧ ਵਿਆਪਕ ਬੀਮਾ ਕਵਰ।' },
  scheme2Docs: { English: 'Aadhaar Card, Land Records, Sowing Certificate', Hindi: 'आधार कार्ड, भूमि रिकॉर्ड, बुवाई प्रमाण पत्र', Marathi: 'आधार कार्ड, जमिनीच्या नोंदी, पेरणी प्रमाणपत्र', Punjabi: 'ਆਧਾਰ ਕਾਰਡ, ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ, ਬਿਜਾਈ ਸਰਟੀਫਿਕੇਟ' },

  // Scheme 3: Soil Health Card
  scheme3Name: { English: 'Soil Health Card Scheme', Hindi: 'मृदा स्वास्थ्य कार्ड योजना', Marathi: 'मृदा आरोग्य कार्ड योजना', Punjabi: 'ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਸਕੀਮ' },
  scheme3Desc: { English: 'Helping farmers to improve productivity through wise use of fertilizers.', Hindi: 'उर्वरकों के बुद्धिमानीपूर्ण उपयोग के माध्यम से उत्पादकता में सुधार करने में किसानों की मदद करना।', Marathi: 'खतांच्या सुज्ञ वापराद्वारे उत्पादकता सुधारण्यासाठी शेतकऱ्यांना मदत करणे.', Punjabi: 'ਖਾਦਾਂ ਦੀ ਸਮਝਦਾਰੀ ਨਾਲ ਵਰਤੋਂ ਰਾਹੀਂ ਉਤਪਾਦਕਤਾ ਵਿੱਚ ਸੁਧਾਰ ਕਰਨ ਵਿੱਚ ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ ਕਰਨਾ।' },
  scheme3Benefit: { English: 'Detailed report on soil health and fertilizer recommendations.', Hindi: 'मृदा स्वास्थ्य और उर्वरक सिफारिशों पर विस्तृत रिपोर्ट।', Marathi: 'मृदा आरोग्य आणि खत शिफारसींवरील तपशीलवार अहवाल.', Punjabi: 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਅਤੇ ਖਾਦ ਦੀਆਂ ਸਿਫ਼ਾਰਸ਼ਾਂ ਬਾਰੇ ਵਿਸਤ੍ਰਿਤ ਰਿਪੋਰਟ।' },
  scheme3Docs: { English: 'Aadhaar Card, Soil Sample Details', Hindi: 'आधार कार्ड, मिट्टी के नमूने का विवरण', Marathi: 'आधार कार्ड, माती नमुन्याचा तपशील', Punjabi: 'ਆਧਾਰ ਕਾਰਡ, ਮਿੱਟੀ ਦੇ ਨਮੂਨੇ ਦੇ ਵੇਰਵੇ' },

  // Scheme 4: PM-KMY
  scheme4Name: { English: 'PM Kisan Maandhan Yojana (PM-KMY)', Hindi: 'पीएम किसान मानधन योजना (PM-KMY)', Marathi: 'पीएम किसान मानधन योजना (PM-KMY)', Punjabi: 'ਪੀਐਮ ਕਿਸਾਨ ਮਾਨਧਨ ਯੋਜਨਾ (PM-KMY)' },
  scheme4Desc: { English: 'Old age pension scheme for all small and marginal farmers.', Hindi: 'सभी छोटे और सीमांत किसानों के लिए वृद्धावस्था पेंशन योजना।', Marathi: 'सर्व अल्प आणि अत्यल्प भूधारक शेतकऱ्यांसाठी वृद्धापकाळ निवृत्ती वेतन योजना.', Punjabi: 'ਸਾਰੇ ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਲਈ ਬੁਢਾਪਾ ਪੈਨਸ਼ਨ ਸਕੀਮ।' },
  scheme4Benefit: { English: 'Minimum assured pension of ₹3,000 per month after age 60.', Hindi: '60 वर्ष की आयु के बाद ₹3,000 प्रति माह की न्यूनतम सुनिश्चित पेंशन।', Marathi: 'वयाच्या ६० वर्षांनंतर दरमहा किमान ₹३,००० खात्रीशीर पेन्शन.', Punjabi: '60 ਸਾਲ ਦੀ ਉਮਰ ਤੋਂ ਬਾਅਦ ₹3,000 ਪ੍ਰਤੀ ਮਹੀਨਾ ਘੱਟੋ-ਘੱਟ ਯਕੀਨੀ ਪੈਨਸ਼ਨ।' },
  scheme4Docs: { English: 'Aadhaar Card, Savings Bank Account, PM-Kisan ID', Hindi: 'आधार कार्ड, बचत बैंक खाता, पीएम-किसान आईडी', Marathi: 'आधार कार्ड, बचत बँक खाते, पीएम-किसान आयडी', Punjabi: 'ਆਧਾਰ ਕਾਰਡ, ਬਚਤ ਬੈਂਕ ਖਾਤਾ, ਪੀਐਮ-ਕਿਸਾਨ ਆਈਡੀ' },

  // Scheme 5: KCC
  scheme5Name: { English: 'Kisan Credit Card (KCC)', Hindi: 'किसान क्रेडिट कार्ड (KCC)', Marathi: 'किसान क्रेडिट कार्ड (KCC)', Punjabi: 'ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ (KCC)' },
  scheme5Desc: { English: 'Adequate and timely credit support from the banking system.', Hindi: 'बैंकिंग प्रणाली से पर्याप्त और समय पर ऋण सहायता।', Marathi: 'बँकिंग प्रणालीकडून पुरेसा आणि वेळेवर कर्ज पुरवठा.', Punjabi: 'ਬੈਂਕਿੰਗ ਪ੍ਰਣਾਲੀ ਤੋਂ ਲੋੜੀਂਦੀ ਅਤੇ ਸਮੇਂ ਸਿਰ ਕ੍ਰੈਡਿਟ ਸਹਾਇਤਾ।' },
  scheme5Benefit: { English: 'Low-interest loans for crop production and maintenance.', Hindi: 'फसल उत्पादन और रखरखाव के लिए कम ब्याज वाले ऋण।', Marathi: 'पीक उत्पादन आणि देखभालीसाठी कमी व्याजाचे कर्ज.', Punjabi: 'ਫਸਲ ਉਤਪਾਦਨ ਅਤੇ ਰੱਖ-ਰਖਾਅ ਲਈ ਘੱਟ ਵਿਆਜ ਵਾਲੇ ਕਰਜ਼ੇ।' },
  scheme5Docs: { English: 'Aadhaar Card, Land Records, Passport Size Photo', Hindi: 'आधार कार्ड, भूमि रिकॉर्ड, पासपोर्ट आकार का फोटो', Marathi: 'आधार कार्ड, जमिनीच्या नोंदी, पासपोर्ट आकाराचा फोटो', Punjabi: 'ਆਧਾਰ ਕਾਰਡ, ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ, ਪਾਸਪੋਰਟ ਸਾਈਜ਼ ਫੋਟੋ' },

  // Auth
  login: { English: 'Login', Hindi: 'लॉगिन', Marathi: 'लॉगिन', Punjabi: 'ਲੌਗਇਨ' },
  register: { English: 'Register', Hindi: 'पंजीकरण', Marathi: 'नोंदणी', Punjabi: 'ਰਜਿਸਟਰ' },
  logout: { English: 'Logout', Hindi: 'लॉगआउट', Marathi: 'लॉगआउट', Punjabi: 'ਲੌਗਆਉਟ' },
  emailLabel: { English: 'Email Address', Hindi: 'ईमेल पता', Marathi: 'ईमेल पत्ता', Punjabi: 'ਈਮੇਲ ਪਤਾ' },
  passwordLabel: { English: 'Password', Hindi: 'पासवर्ड', Marathi: 'पासवर्ड', Punjabi: 'ਪਾਸਵਰਡ' },
  alreadyHaveAccount: { English: 'Already have an account? Login', Hindi: 'पहले से ही एक खाता है? लॉगिन करें', Marathi: 'आधीच खाते आहे? लॉगिन करा', Punjabi: 'ਪਹਿਲਾਂ ਹੀ ਇੱਕ ਖਾਤਾ ਹੈ? ਲੌਗਇਨ ਕਰੋ' },
  dontHaveAccount: { English: 'Don\'t have an account? Register', Hindi: 'खाता नहीं है? पंजीकरण करें', Marathi: 'खाते नाही? नोंदणी करा', Punjabi: 'ਖਾਤਾ ਨਹੀਂ ਹੈ? ਰਜਿਸਟਰ ਕਰੋ' },
  myResults: { English: 'My Past Results', Hindi: 'मेरे पिछले परिणाम', Marathi: 'माझे मागील निकाल', Punjabi: 'ਮੇਰੇ ਪਿਛਲੇ ਨਤੀਜੇ' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('English');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
