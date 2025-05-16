import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  // FIXME: 1. These should be loaded from a JSON file
  //        2. That JSON file should be generated from the main loris .po/.mo file in locale/
  ja: {
    loris: {
      // Filters
      'Selection Filter': '選択フィルター',
      'Show Filters': 'フィルターを表示',
      'Hide Filters': 'フィルターを非表示',
      'Clear Filters': 'フィルターをクリア',
      // Common candidate terms
      'PSCID': 'プロジェクト識別子',
      'DCCID': '候補者識別子',
      'Visit Label': 'ラベルを訪問',
      'Site': 'サイト',
      'Project': 'プロジェクト',
      'Cohort': 'コホート',
      'Date of registration': '入学日',
      'Participant Status': '参加者ステータス',
      'DoB': '生年月日',
      'Sex': '性別',
      'Feedback': 'フィードバック',
      // Other common terms
      'Scans': 'スキャン',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    load: 'languageOnly',
    // debug: true,
    partialBundledLanguages: true,
    lng: loris.user.langpref ?? 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // Modules add to this with addResourceBundle
    ns: ['loris'],
    defaultNS: 'loris',
    fallbackNS: [],
  });
export default i18n;
