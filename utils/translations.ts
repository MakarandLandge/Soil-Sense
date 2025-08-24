export interface Translation {
  // Navigation
  dashboard: string;
  farms: string;
  fields: string;
  reports: string;
  settings: string;

  // Common
  add: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  ok: string;
  yes: string;
  no: string;
  loading: string;
  error: string;
  success: string;
  required: string;
  optional: string;

  // Dashboard
  welcomeBack: string;
  currentSoilPH: string;
  moistureLevel: string;
  soilTemp: string;
  fieldsActive: string;
  alerts: string;
  smartRecommendations: string;
  recentPHReadings: string;
  addPHReading: string;
  phValue: string;
  selectField: string;
  addReading: string;

  // pH Status
  acidic: string;
  neutral: string;
  alkaline: string;
  optimal: string;
  healthy: string;
  needsAttention: string;
  critical: string;

  // Farms
  myFarms: string;
  totalFarms: string;
  totalFields: string;
  totalAcres: string;
  addNewFarm: string;
  farmName: string;
  location: string;
  totalArea: string;
  ownerName: string;
  contactNumber: string;
  primarySoilType: string;
  addFarm: string;
  acres: string;
  fields: string;
  owner: string;
  soil: string;
  added: string;

  // Fields
  myFields: string;
  addNewField: string;
  fieldName: string;
  cropType: string;
  variety: string;
  area: string;
  sowingDate: string;
  addField: string;
  sown: string;
  days: string;

  // Reports
  exportAndAnalyze: string;
  generateNewReport: string;
  weekly: string;
  monthly: string;
  generateReport: string;
  quickStats: string;
  totalPHReadings: string;
  reportsGenerated: string;
  recentReports: string;
  download: string;
  share: string;

  // Settings
  customizeExperience: string;
  profile: string;
  manageProfiles: string;
  currentProfile: string;
  notifications: string;
  pushNotifications: string;
  weatherAlerts: string;
  dataSync: string;
  googleDriveSync: string;
  languageRegion: string;
  language: string;
  device: string;
  sensorConnection: string;
  support: string;
  helpFAQ: string;
  contactSupport: string;
  privacySecurity: string;
  privacyPolicy: string;
  version: string;
  smartSoilMonitoring: string;

  // Profile Management
  createNewProfile: string;
  editProfile: string;
  basicInformation: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  farmInformation: string;
  primaryFarmName: string;
  farmingExperience: string;
  specialization: string;
  createProfile: string;
  updateProfile: string;
  addPhoto: string;
  aboutMultipleProfiles: string;
  multipleProfilesDescription: string;
  profilesCount: string;
  active: string;
  addProfile: string;
  currentProfileText: string;
  cannotDelete: string;
  deleteProfile: string;
  deleteConfirmation: string;
  profileSwitched: string;
  profileChanged: string;

  // Soil Types
  loamy: string;
  clay: string;
  sandy: string;
  silt: string;
  peaty: string;
  chalky: string;

  // Crops
  wheat: string;
  rice: string;
  maize: string;
  cotton: string;
  sugarcane: string;
  soybean: string;

  // Experience Levels
  beginner: string;
  intermediate: string;
  expert: string;

  // Specializations
  organicFarming: string;
  cropRotation: string;
  soilManagement: string;
  irrigation: string;
  pestControl: string;
  dairyFarming: string;
  generalFarming: string;

  // Validation Messages
  missingInformation: string;
  fillRequiredFields: string;
  invalidPHValue: string;
  enterPHBetween: string;
  namePhoneLocationRequired: string;

  // Recommendations
  reduceNitrogenFertilizer: string;
  nitrogenRecommendation: string;
  weatherAlert: string;
  weatherRecommendation: string;
  allFields: string;

  // Priority Levels
  low: string;
  medium: string;
  high: string;

  // Trends
  new: string;
  up: string;
  down: string;

  // Language Names
  english: string;
  hindi: string;
  marathi: string;
  telugu: string;
  tamil: string;
  bengali: string;
  gujarati: string;
  kannada: string;
  malayalam: string;
  punjabi: string;
  odia: string;
  assamese: string;

  // Additional
  selectLanguage: string;
  moreLanguages: string;
  notSpecified: string;
  standard: string;
  viewDetails: string;
  bluetoothSensors: string;
  howWeProtect: string;
  getHelp: string;
  backupReports: string;
  receiveNotifications: string;
  getAlerts: string;
}

export const translations: Record<string, Translation> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    farms: 'Farms',
    fields: 'Fields',
    reports: 'Reports',
    settings: 'Settings',

    // Common
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    loading: 'Loading',
    error: 'Error',
    success: 'Success',
    required: 'Required',
    optional: 'Optional',

    // Dashboard
    welcomeBack: 'Welcome back,',
    currentSoilPH: 'Current Soil pH',
    moistureLevel: 'Moisture Level',
    soilTemp: 'Soil Temp',
    fieldsActive: 'Fields Active',
    alerts: 'Alerts',
    smartRecommendations: 'Smart Recommendations',
    recentPHReadings: 'Recent pH Readings',
    addPHReading: 'Add pH Reading',
    phValue: 'pH Value (0-14)',
    selectField: 'Select Field',
    addReading: 'Add Reading',

    // pH Status
    acidic: 'Acidic',
    neutral: 'Neutral',
    alkaline: 'Alkaline',
    optimal: 'Optimal',
    healthy: 'Healthy',
    needsAttention: 'Needs Attention',
    critical: 'Critical',

    // Farms
    myFarms: 'My Farms',
    totalFarms: 'Total Farms',
    totalFields: 'Total Fields',
    totalAcres: 'Total Acres',
    addNewFarm: 'Add New Farm',
    farmName: 'Farm Name',
    location: 'Location',
    totalArea: 'Total Area (acres)',
    ownerName: 'Owner Name',
    contactNumber: 'Contact Number',
    primarySoilType: 'Primary Soil Type',
    addFarm: 'Add Farm',
    acres: 'acres',
    fields: 'fields',
    owner: 'Owner',
    soil: 'Soil',
    added: 'Added',

    // Fields
    myFields: 'My Fields',
    addNewField: 'Add New Field',
    fieldName: 'Field Name',
    cropType: 'Crop Type',
    variety: 'Variety',
    area: 'Area (acres)',
    sowingDate: 'Sowing Date',
    addField: 'Add Field',
    sown: 'Sown',
    days: 'days',

    // Reports
    exportAndAnalyze: 'Export and analyze your farm data',
    generateNewReport: 'Generate New Report',
    weekly: 'Weekly',
    monthly: 'Monthly',
    generateReport: 'Generate Report',
    quickStats: 'Quick Stats',
    totalPHReadings: 'Total pH Readings',
    reportsGenerated: 'Reports Generated',
    recentReports: 'Recent Reports',
    download: 'Download',
    share: 'Share',

    // Settings
    customizeExperience: 'Customize your SoilSense experience',
    profile: 'Profile',
    manageProfiles: 'Manage Profiles',
    currentProfile: 'Current Profile',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    weatherAlerts: 'Weather Alerts',
    dataSync: 'Data & Sync',
    googleDriveSync: 'Google Drive Sync',
    languageRegion: 'Language & Region',
    language: 'Language',
    device: 'Device',
    sensorConnection: 'Sensor Connection',
    support: 'Support',
    helpFAQ: 'Help & FAQ',
    contactSupport: 'Contact Support',
    privacySecurity: 'Privacy & Security',
    privacyPolicy: 'Privacy Policy',
    version: 'Version',
    smartSoilMonitoring: 'Smart soil monitoring for modern farmers',

    // Profile Management
    createNewProfile: 'Create New Profile',
    editProfile: 'Edit Profile',
    basicInformation: 'Basic Information',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    farmInformation: 'Farm Information',
    primaryFarmName: 'Primary Farm Name',
    farmingExperience: 'Farming Experience',
    specialization: 'Specialization',
    createProfile: 'Create Profile',
    updateProfile: 'Update Profile',
    addPhoto: 'Add Photo',
    aboutMultipleProfiles: 'About Multiple Profiles',
    multipleProfilesDescription: 'Create separate profiles for different family members or farm managers. Each profile can have its own farms, fields, and settings. Switch between profiles anytime to access personalized data and recommendations.',
    profilesCount: 'profiles',
    active: 'Active',
    addProfile: 'Add Profile',
    currentProfileText: 'Current Profile',
    cannotDelete: 'Cannot Delete',
    deleteProfile: 'Delete Profile',
    deleteConfirmation: 'Are you sure you want to delete {name}\'s profile? This action cannot be undone.',
    profileSwitched: 'Profile Switched',
    profileChanged: 'Profile has been changed successfully',

    // Soil Types
    loamy: 'Loamy',
    clay: 'Clay',
    sandy: 'Sandy',
    silt: 'Silt',
    peaty: 'Peaty',
    chalky: 'Chalky',

    // Crops
    wheat: 'Wheat',
    rice: 'Rice',
    maize: 'Maize',
    cotton: 'Cotton',
    sugarcane: 'Sugarcane',
    soybean: 'Soybean',

    // Experience Levels
    beginner: 'Beginner (0-2 years)',
    intermediate: 'Intermediate (3-10 years)',
    expert: 'Expert (10+ years)',

    // Specializations
    organicFarming: 'Organic Farming',
    cropRotation: 'Crop Rotation',
    soilManagement: 'Soil Management',
    irrigation: 'Irrigation',
    pestControl: 'Pest Control',
    dairyFarming: 'Dairy Farming',
    generalFarming: 'General Farming',

    // Validation Messages
    missingInformation: 'Missing Information',
    fillRequiredFields: 'Please fill in all required fields',
    invalidPHValue: 'Invalid pH Value',
    enterPHBetween: 'Please enter a pH value between 0 and 14',
    namePhoneLocationRequired: 'Please fill in all required fields (Name, Phone, Location)',

    // Recommendations
    reduceNitrogenFertilizer: 'Reduce Nitrogen Fertilizer',
    nitrogenRecommendation: 'Based on current pH levels (6.5), reduce nitrogen fertilizer by 15% to prevent soil acidification.',
    weatherAlert: 'Weather Alert',
    weatherRecommendation: 'Heavy rain expected in 2 days. Consider postponing fertilizer application.',
    allFields: 'All Fields',

    // Priority Levels
    low: 'low',
    medium: 'medium',
    high: 'high',

    // Trends
    new: 'New',
    up: '+',
    down: '-',

    // Language Names
    english: 'English',
    hindi: 'हिन्दी (Hindi)',
    marathi: 'मराठी (Marathi)',
    telugu: 'తెలుగు (Telugu)',
    tamil: 'தமிழ் (Tamil)',
    bengali: 'বাংলা (Bengali)',
    gujarati: 'ગુજરાતી (Gujarati)',
    kannada: 'ಕನ್ನಡ (Kannada)',
    malayalam: 'മലയാളം (Malayalam)',
    punjabi: 'ਪੰਜਾਬੀ (Punjabi)',
    odia: 'ଓଡ଼ିଆ (Odia)',
    assamese: 'অসমীয়া (Assamese)',

    // Additional
    selectLanguage: 'Select Language',
    moreLanguages: 'More languages will be added in future updates',
    notSpecified: 'Not specified',
    standard: 'Standard',
    viewDetails: 'View Details',
    bluetoothSensors: 'Bluetooth pH sensors',
    howWeProtect: 'How we protect your data',
    getHelp: 'Get help with using SoilSense',
    backupReports: 'Backup reports to Google Drive',
    receiveNotifications: 'Receive notifications about weather changes',
    getAlerts: 'Get alerts for pH changes and recommendations',
  },

  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    farms: 'खेत',
    fields: 'खेत',
    reports: 'रिपोर्ट',
    settings: 'सेटिंग्स',

    // Common
    add: 'जोड़ें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    ok: 'ठीक है',
    yes: 'हाँ',
    no: 'नहीं',
    loading: 'लोड हो रहा है',
    error: 'त्रुटि',
    success: 'सफलता',
    required: 'आवश्यक',
    optional: 'वैकल्पिक',

    // Dashboard
    welcomeBack: 'वापसी पर स्वागत है,',
    currentSoilPH: 'वर्तमान मिट्टी का pH',
    moistureLevel: 'नमी का स्तर',
    soilTemp: 'मिट्टी का तापमान',
    fieldsActive: 'सक्रिय खेत',
    alerts: 'अलर्ट',
    smartRecommendations: 'स्मार्ट सुझाव',
    recentPHReadings: 'हाल की pH रीडिंग',
    addPHReading: 'pH रीडिंग जोड़ें',
    phValue: 'pH मान (0-14)',
    selectField: 'खेत चुनें',
    addReading: 'रीडिंग जोड़ें',

    // pH Status
    acidic: 'अम्लीय',
    neutral: 'तटस्थ',
    alkaline: 'क्षारीय',
    optimal: 'इष्टतम',
    healthy: 'स्वस्थ',
    needsAttention: 'ध्यान चाहिए',
    critical: 'गंभीर',

    // Farms
    myFarms: 'मेरे खेत',
    totalFarms: 'कुल खेत',
    totalFields: 'कुल खेत',
    totalAcres: 'कुल एकड़',
    addNewFarm: 'नया खेत जोड़ें',
    farmName: 'खेत का नाम',
    location: 'स्थान',
    totalArea: 'कुल क्षेत्रफल (एकड़)',
    ownerName: 'मालिक का नाम',
    contactNumber: 'संपर्क नंबर',
    primarySoilType: 'मुख्य मिट्टी का प्रकार',
    addFarm: 'खेत जोड़ें',
    acres: 'एकड़',
    fields: 'खेत',
    owner: 'मालिक',
    soil: 'मिट्टी',
    added: 'जोड़ा गया',

    // Fields
    myFields: 'मेरे खेत',
    addNewField: 'नया खेत जोड़ें',
    fieldName: 'खेत का नाम',
    cropType: 'फसल का प्रकार',
    variety: 'किस्म',
    area: 'क्षेत्रफल (एकड़)',
    sowingDate: 'बुआई की तारीख',
    addField: 'खेत जोड़ें',
    sown: 'बोया गया',
    days: 'दिन',

    // Reports
    exportAndAnalyze: 'अपने खेत के डेटा का निर्यात और विश्लेषण करें',
    generateNewReport: 'नई रिपोर्ट बनाएं',
    weekly: 'साप्ताहिक',
    monthly: 'मासिक',
    generateReport: 'रिपोर्ट बनाएं',
    quickStats: 'त्वरित आंकड़े',
    totalPHReadings: 'कुल pH रीडिंग',
    reportsGenerated: 'बनाई गई रिपोर्ट',
    recentReports: 'हाल की रिपोर्ट',
    download: 'डाउनलोड',
    share: 'साझा करें',

    // Settings
    customizeExperience: 'अपने SoilSense अनुभव को अनुकूलित करें',
    profile: 'प्रोफ़ाइल',
    manageProfiles: 'प्रोफ़ाइल प्रबंधित करें',
    currentProfile: 'वर्तमान प्रोफ़ाइल',
    notifications: 'सूचनाएं',
    pushNotifications: 'पुश सूचनाएं',
    weatherAlerts: 'मौसम अलर्ट',
    dataSync: 'डेटा और सिंक',
    googleDriveSync: 'Google Drive सिंक',
    languageRegion: 'भाषा और क्षेत्र',
    language: 'भाषा',
    device: 'डिवाइस',
    sensorConnection: 'सेंसर कनेक्शन',
    support: 'सहायता',
    helpFAQ: 'सहायता और FAQ',
    contactSupport: 'सहायता से संपर्क करें',
    privacySecurity: 'गोपनीयता और सुरक्षा',
    privacyPolicy: 'गोपनीयता नीति',
    version: 'संस्करण',
    smartSoilMonitoring: 'आधुनिक किसानों के लिए स्मार्ट मिट्टी निगरानी',

    // Profile Management
    createNewProfile: 'नई प्रोफ़ाइल बनाएं',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    basicInformation: 'बुनियादी जानकारी',
    fullName: 'पूरा नाम',
    phoneNumber: 'फोन नंबर',
    emailAddress: 'ईमेल पता',
    farmInformation: 'खेत की जानकारी',
    primaryFarmName: 'मुख्य खेत का नाम',
    farmingExperience: 'खेती का अनुभव',
    specialization: 'विशेषज्ञता',
    createProfile: 'प्रोफ़ाइल बनाएं',
    updateProfile: 'प्रोफ़ाइल अपडेट करें',
    addPhoto: 'फोटो जोड़ें',
    aboutMultipleProfiles: 'कई प्रोफ़ाइल के बारे में',
    multipleProfilesDescription: 'विभिन्न परिवारी सदस्यों या खेत प्रबंधकों के लिए अलग प्रोफ़ाइल बनाएं। प्रत्येक प्रोफ़ाइल के अपने खेत, खेत और सेटिंग्स हो सकते हैं। व्यक्तिगत डेटा और सुझावों तक पहुंचने के लिए कभी भी प्रोफ़ाइल के बीच स्विच करें।',
    profilesCount: 'प्रोफ़ाइल',
    active: 'सक्रिय',
    addProfile: 'प्रोफ़ाइल जोड़ें',
    currentProfileText: 'वर्तमान प्रोफ़ाइल',
    cannotDelete: 'हटा नहीं सकते',
    deleteProfile: 'प्रोफ़ाइल हटाएं',
    deleteConfirmation: 'क्या आप वाकई {name} की प्रोफ़ाइल हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।',
    profileSwitched: 'प्रोफ़ाइल बदली गई',
    profileChanged: 'प्रोफ़ाइल सफलतापूर्वक बदली गई है',

    // Soil Types
    loamy: 'दोमट',
    clay: 'चिकनी',
    sandy: 'रेतीली',
    silt: 'गाद',
    peaty: 'पीटी',
    chalky: 'चूना पत्थर',

    // Crops
    wheat: 'गेहूं',
    rice: 'चावल',
    maize: 'मक्का',
    cotton: 'कपास',
    sugarcane: 'गन्ना',
    soybean: 'सोयाबीन',

    // Experience Levels
    beginner: 'शुरुआती (0-2 साल)',
    intermediate: 'मध्यम (3-10 साल)',
    expert: 'विशेषज्ञ (10+ साल)',

    // Specializations
    organicFarming: 'जैविक खेती',
    cropRotation: 'फसल चक्र',
    soilManagement: 'मिट्टी प्रबंधन',
    irrigation: 'सिंचाई',
    pestControl: 'कीट नियंत्रण',
    dairyFarming: 'डेयरी फार्मिंग',
    generalFarming: 'सामान्य खेती',

    // Validation Messages
    missingInformation: 'जानकारी गुम है',
    fillRequiredFields: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    invalidPHValue: 'अमान्य pH मान',
    enterPHBetween: 'कृपया 0 और 14 के बीच pH मान दर्ज करें',
    namePhoneLocationRequired: 'कृपया सभी आवश्यक फ़ील्ड भरें (नाम, फोन, स्थान)',

    // Recommendations
    reduceNitrogenFertilizer: 'नाइट्रोजन उर्वरक कम करें',
    nitrogenRecommendation: 'वर्तमान pH स्तर (6.5) के आधार पर, मिट्टी के अम्लीकरण को रोकने के लिए नाइट्रोजन उर्वरक को 15% कम करें।',
    weatherAlert: 'मौसम चेतावनी',
    weatherRecommendation: '2 दिनों में भारी बारिश की उम्मीद है। उर्वरक का प्रयोग स्थगित करने पर विचार करें।',
    allFields: 'सभी खेत',

    // Priority Levels
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',

    // Trends
    new: 'नया',
    up: '+',
    down: '-',

    // Language Names
    english: 'English',
    hindi: 'हिन्दी',
    marathi: 'मराठी',
    telugu: 'తెలుగు',
    tamil: 'தமிழ்',
    bengali: 'বাংলা',
    gujarati: 'ગુજરાતી',
    kannada: 'ಕನ್ನಡ',
    malayalam: 'മലയാളം',
    punjabi: 'ਪੰਜਾਬੀ',
    odia: 'ଓଡ଼ିଆ',
    assamese: 'অসমীয়া',

    // Additional
    selectLanguage: 'भाषा चुनें',
    moreLanguages: 'भविष्य के अपडेट में और भाषाएं जोड़ी जाएंगी',
    notSpecified: 'निर्दिष्ट नहीं',
    standard: 'मानक',
    viewDetails: 'विवरण देखें',
    bluetoothSensors: 'ब्लूटूथ pH सेंसर',
    howWeProtect: 'हम आपके डेटा की सुरक्षा कैसे करते हैं',
    getHelp: 'SoilSense का उपयोग करने में सहायता प्राप्त करें',
    backupReports: 'Google Drive में रिपोर्ट का बैकअप लें',
    receiveNotifications: 'मौसम परिवर्तन के बारे में सूचनाएं प्राप्त करें',
    getAlerts: 'pH परिवर्तन और सुझावों के लिए अलर्ट प्राप्त करें',
  },

  mr: {
    // Navigation
    dashboard: 'डॅशबोर्ड',
    farms: 'शेत',
    fields: 'शेत',
    reports: 'अहवाल',
    settings: 'सेटिंग्ज',

    // Common
    add: 'जोडा',
    edit: 'संपादित करा',
    delete: 'हटवा',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    ok: 'ठीक आहे',
    yes: 'होय',
    no: 'नाही',
    loading: 'लोड होत आहे',
    error: 'त्रुटी',
    success: 'यश',
    required: 'आवश्यक',
    optional: 'पर्यायी',

    // Dashboard
    welcomeBack: 'परत स्वागत आहे,',
    currentSoilPH: 'सध्याचा मातीचा pH',
    moistureLevel: 'ओलावा पातळी',
    soilTemp: 'मातीचे तापमान',
    fieldsActive: 'सक्रिय शेत',
    alerts: 'सूचना',
    smartRecommendations: 'स्मार्ट शिफारसी',
    recentPHReadings: 'अलीकडील pH वाचन',
    addPHReading: 'pH वाचन जोडा',
    phValue: 'pH मूल्य (0-14)',
    selectField: 'शेत निवडा',
    addReading: 'वाचन जोडा',

    // pH Status
    acidic: 'आम्लीय',
    neutral: 'तटस्थ',
    alkaline: 'क्षारीय',
    optimal: 'इष्टतम',
    healthy: 'निरोगी',
    needsAttention: 'लक्ष आवश्यक',
    critical: 'गंभीर',

    // Farms
    myFarms: 'माझी शेत',
    totalFarms: 'एकूण शेत',
    totalFields: 'एकूण शेत',
    totalAcres: 'एकूण एकर',
    addNewFarm: 'नवीन शेत जोडा',
    farmName: 'शेताचे नाव',
    location: 'स्थान',
    totalArea: 'एकूण क्षेत्रफळ (एकर)',
    ownerName: 'मालकाचे नाव',
    contactNumber: 'संपर्क क्रमांक',
    primarySoilType: 'मुख्य मातीचा प्रकार',
    addFarm: 'शेत जोडा',
    acres: 'एकर',
    fields: 'शेत',
    owner: 'मालक',
    soil: 'माती',
    added: 'जोडले',

    // Fields
    myFields: 'माझी शेत',
    addNewField: 'नवीन शेत जोडा',
    fieldName: 'शेताचे नाव',
    cropType: 'पिकाचा प्रकार',
    variety: 'जात',
    area: 'क्षेत्रफळ (एकर)',
    sowingDate: 'पेरणीची तारीख',
    addField: 'शेत जोडा',
    sown: 'पेरले',
    days: 'दिवस',

    // Reports
    exportAndAnalyze: 'तुमच्या शेताच्या डेटाचे निर्यात आणि विश्लेषण करा',
    generateNewReport: 'नवीन अहवाल तयार करा',
    weekly: 'साप्ताहिक',
    monthly: 'मासिक',
    generateReport: 'अहवाल तयार करा',
    quickStats: 'त्वरित आकडेवारी',
    totalPHReadings: 'एकूण pH वाचन',
    reportsGenerated: 'तयार केलेले अहवाल',
    recentReports: 'अलीकडील अहवाल',
    download: 'डाउनलोड',
    share: 'सामायिक करा',

    // Settings
    customizeExperience: 'तुमचा SoilSense अनुभव सानुकूलित करा',
    profile: 'प्रोफाइल',
    manageProfiles: 'प्रोफाइल व्यवस्थापित करा',
    currentProfile: 'सध्याची प्रोफाइल',
    notifications: 'सूचना',
    pushNotifications: 'पुश सूचना',
    weatherAlerts: 'हवामान सूचना',
    dataSync: 'डेटा आणि सिंक',
    googleDriveSync: 'Google Drive सिंक',
    languageRegion: 'भाषा आणि प्रदेश',
    language: 'भाषा',
    device: 'उपकरण',
    sensorConnection: 'सेन्सर कनेक्शन',
    support: 'समर्थन',
    helpFAQ: 'मदत आणि FAQ',
    contactSupport: 'समर्थनाशी संपर्क साधा',
    privacySecurity: 'गोपनीयता आणि सुरक्षा',
    privacyPolicy: 'गोपनीयता धोरण',
    version: 'आवृत्ती',
    smartSoilMonitoring: 'आधुनिक शेतकऱ्यांसाठी स्मार्ट माती निरीक्षण',

    // Profile Management
    createNewProfile: 'नवीन प्रोफाइल तयार करा',
    editProfile: 'प्रोफाइल संपादित करा',
    basicInformation: 'मूलभूत माहिती',
    fullName: 'पूर्ण नाव',
    phoneNumber: 'फोन नंबर',
    emailAddress: 'ईमेल पत्ता',
    farmInformation: 'शेताची माहिती',
    primaryFarmName: 'मुख्य शेताचे नाव',
    farmingExperience: 'शेतीचा अनुभव',
    specialization: 'विशेषज्ञता',
    createProfile: 'प्रोफाइल तयार करा',
    updateProfile: 'प्रोफाइल अपडेट करा',
    addPhoto: 'फोटो जोडा',
    aboutMultipleProfiles: 'अनेक प्रोफाइलबद्दल',
    multipleProfilesDescription: 'विविध कुटुंबातील सदस्यांसाठी किंवा शेत व्यवस्थापकांसाठी स्वतंत्र प्रोफाइल तयार करा। प्रत्येक प्रोफाइलची स्वतःची शेत, शेत आणि सेटिंग्ज असू शकतात। वैयक्तिक डेटा आणि शिफारसींमध्ये प्रवेश करण्यासाठी कधीही प्रोफाइल दरम्यान स्विच करा।',
    profilesCount: 'प्रोफाइल',
    active: 'सक्रिय',
    addProfile: 'प्रोफाइल जोडा',
    currentProfileText: 'सध्याची प्रोफाइल',
    cannotDelete: 'हटवू शकत नाही',
    deleteProfile: 'प्रोफाइल हटवा',
    deleteConfirmation: 'तुम्हाला खरोखर {name} ची प्रोफाइल हटवायची आहे का? ही क्रिया पूर्ववत केली जाऊ शकत नाही.',
    profileSwitched: 'प्रोफाइल बदलली',
    profileChanged: 'प्रोफाइल यशस्वीरित्या बदलली गेली आहे',

    // Soil Types
    loamy: 'दोमट',
    clay: 'चिकणमाती',
    sandy: 'वालुकामय',
    silt: 'गाळ',
    peaty: 'पीटी',
    chalky: 'खडू',

    // Crops
    wheat: 'गहू',
    rice: 'तांदूळ',
    maize: 'मका',
    cotton: 'कापूस',
    sugarcane: 'ऊस',
    soybean: 'सोयाबीन',

    // Experience Levels
    beginner: 'नवशिक्या (0-2 वर्षे)',
    intermediate: 'मध्यम (3-10 वर्षे)',
    expert: 'तज्ञ (10+ वर्षे)',

    // Specializations
    organicFarming: 'सेंद्रिय शेती',
    cropRotation: 'पीक फेरफार',
    soilManagement: 'माती व्यवस्थापन',
    irrigation: 'सिंचन',
    pestControl: 'कीड नियंत्रण',
    dairyFarming: 'दुग्ध व्यवसाय',
    generalFarming: 'सामान्य शेती',

    // Validation Messages
    missingInformation: 'माहिती गहाळ आहे',
    fillRequiredFields: 'कृपया सर्व आवश्यक फील्ड भरा',
    invalidPHValue: 'अवैध pH मूल्य',
    enterPHBetween: 'कृपया 0 आणि 14 दरम्यान pH मूल्य प्रविष्ट करा',
    namePhoneLocationRequired: 'कृपया सर्व आवश्यक फील्ड भरा (नाव, फोन, स्थान)',

    // Recommendations
    reduceNitrogenFertilizer: 'नायट्रोजन खत कमी करा',
    nitrogenRecommendation: 'सध्याच्या pH पातळीच्या (6.5) आधारे, मातीचे आम्लीकरण टाळण्यासाठी नायट्रोजन खत 15% कमी करा.',
    weatherAlert: 'हवामान चेतावणी',
    weatherRecommendation: '2 दिवसांत मुसळधार पावसाची अपेक्षा आहे. खत वापरणे पुढे ढकलण्याचा विचार करा.',
    allFields: 'सर्व शेत',

    // Priority Levels
    low: 'कमी',
    medium: 'मध्यम',
    high: 'उच्च',

    // Trends
    new: 'नवीन',
    up: '+',
    down: '-',

    // Language Names
    english: 'English',
    hindi: 'हिन्दी',
    marathi: 'मराठी',
    telugu: 'తెలుగు',
    tamil: 'தமிழ்',
    bengali: 'বাংলা',
    gujarati: 'ગુજરાતી',
    kannada: 'ಕನ್ನಡ',
    malayalam: 'മലയാളം',
    punjabi: 'ਪੰਜਾਬੀ',
    odia: 'ଓଡ଼ିଆ',
    assamese: 'অসমীয়া',

    // Additional
    selectLanguage: 'भाषा निवडा',
    moreLanguages: 'भविष्यातील अपडेटमध्ये अधिक भाषा जोडल्या जातील',
    notSpecified: 'निर्दिष्ट नाही',
    standard: 'मानक',
    viewDetails: 'तपशील पहा',
    bluetoothSensors: 'ब्लूटूथ pH सेन्सर',
    howWeProtect: 'आम्ही तुमच्या डेटाचे संरक्षण कसे करतो',
    getHelp: 'SoilSense वापरण्यात मदत मिळवा',
    backupReports: 'Google Drive वर अहवालांचा बॅकअप घ्या',
    receiveNotifications: 'हवामान बदलांबद्दल सूचना मिळवा',
    getAlerts: 'pH बदल आणि शिफारसींसाठी अलर्ट मिळवा',
  },
};

export const getTranslation = (key: keyof Translation, language: string = 'en'): string => {
  return translations[language]?.[key] || translations['en'][key] || key;
};

export const formatTranslation = (key: keyof Translation, language: string = 'en', params: Record<string, string> = {}): string => {
  let text = getTranslation(key, language);
  
  Object.keys(params).forEach(param => {
    text = text.replace(`{${param}}`, params[param]);
  });
  
  return text;
};