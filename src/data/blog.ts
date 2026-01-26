export interface BlogSection {
  type: 'heading' | 'paragraph' | 'image' | 'html'
  content: string
  level?: number // For headings (2 = h2, 3 = h3, etc.)
  alt?: string // For images
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  featuredImage?: string
  sections: BlogSection[]
  cta: {
    text: string
    link: string
  }
  visibleFrom?: string // ISO date string (YYYY-MM-DD) - post will be hidden until this date
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ai-in-de-praktijk-van-slimme-loodgieters-tot-de-dietist-van-de-toekomst',
    title: 'AI in de Praktijk: Van Slimme Loodgieters tot de Diëtist van de Toekomst',
    excerpt: 'De term "AI" vliegt ons om de oren, maar wat heb je er concreet aan als je niet in de tech-sector werkt? Bij Studio Thielman geloven we dat AI pas echt waardevol wordt wanneer het naadloos integreert in je dagelijkse workflow.',
    date: 'JAN 2026',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&q=80', // AI/Technology image
    sections: [
      {
        type: 'paragraph',
        content: 'De term "AI" vliegt ons om de oren, maar wat heb je er concreet aan als je niet in de tech-sector werkt? Bij Studio Thielman geloven we dat AI pas echt waardevol wordt wanneer het naadloos integreert in je dagelijkse workflow. Het gaat niet om het vervangen van menselijke expertise, maar om het automatiseren van randzaken, zodat jij je kunt focussen op waar je écht goed in bent. We duiken in drie totaal verschillende sectoren om te laten zien hoe deze technologie vandaag al impact maakt.'
      },
      {
        type: 'heading',
        content: 'De Loodgieter: Efficiëntie tot in de kleinste leiding',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Voor een loodgieter zit de grootste uitdaging vaak niet in het repareren zelf, maar in de planning en de eerste diagnose. Stel je een AI-gestuurde assistent voor op de website die 24/7 bereikbaar is. Wanneer een klant een foto stuurt van een lekkende koppeling, kan de AI het type leiding herkennen en direct inschatten welke onderdelen er nodig zijn.'
      },
      {
        type: 'paragraph',
        content: 'Bovendien kan een slimme planner de route van de bestelbus optimaliseren op basis van live verkeersdata en de urgentie van de klus. Hierdoor verliest de vakman geen tijd aan administratie of onnodige ritten naar de groothandel, maar staat hij sneller bij de klant aan de deur met de juiste oplossing.'
      },
      {
        type: 'heading',
        content: 'De Boekhouder: Van cijfers verwerken naar strategisch advies',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'In de wereld van accountancy zorgt AI voor een stille revolutie. Waar een boekhouder vroeger uren besteedde aan het handmatig invoeren van facturen en het matchen van bankafschriften, neemt intelligente software dit nu in een fractie van een seconde over. AI herkent patronen en signaleert onmiddellijk afwijkingen die voor het menselijk oog onzichtbaar blijven, wat de kans op fouten drastisch verkleint.'
      },
      {
        type: 'paragraph',
        content: 'De echte winst zit echter in de toekomstvisie. AI kan op basis van historische data nauwkeurige cashflow-prognoses maken. Zo verandert de rol van de boekhouder: van iemand die vertelt hoe het kwartaal was, naar een strategisch partner die op basis van data adviseert over de stappen van morgen.'
      },
      {
        type: 'heading',
        content: 'De Diëtist: Personalisatie op schaal',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Voor een diëtist is elk lichaam en elk traject uniek. AI helpt hier om personalisatie naar een hoger niveau te tillen zonder dat het uren extra werk kost. Denk aan algoritmes die razendsnel op maat gemaakte maaltijdplannen genereren op basis van bloedwaarden, allergieën en persoonlijke voorkeuren. Ook kan AI cliënten ondersteunen door via een app foto\'s van hun maaltijden te analyseren en direct feedback te geven op de voedingswaarden.'
      },
      {
        type: 'paragraph',
        content: 'Dit geeft de diëtist meer ruimte voor het menselijke aspect: de coaching en de emotionele begeleiding. Omdat we zien hoeveel tijd diëtisten kwijt zijn aan de zakelijke kant van hun praktijk, hebben we bij Studio Thielman besloten om onze expertise hier specifiek in te zetten.'
      },
      {
        type: 'heading',
        content: 'Primeur voor diëtisten',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Op dit moment leggen wij de laatste hand aan een gloednieuw, gespecialiseerd boekhoudpakket dat specifiek is ontworpen voor de behoeften van diëtisten. Geen algemeen gedoe, maar een tool die jouw vaktaal spreekt.'
      },
      {
        type: 'paragraph',
        content: 'Wil je als eerste op de hoogte zijn van de lancering of meedenken over de functies? Laat hieronder je e-mailadres achter en schrijf je in voor onze nieuwsbrief.'
      },
      {
        type: 'html',
        content: `<div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
  <style type="text/css">
        #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 100%; max-width: 600px;}
        /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
           We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
    <form action="https://studiothielman.us1.list-manage.com/subscribe/post?u=d8444475eb02ed17efa7940b0&amp;id=054dfd1817&amp;f_id=00d3cfe4f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
        <div id="mc_embed_signup_scroll"><h2>Blijf op de hoogte van het boekhoudplatform voor diëtisten!</h2>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value=""></div>
        <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display: none;"></div>
            <div class="response" id="mce-success-response" style="display: none;"></div>
        </div><div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_d8444475eb02ed17efa7940b0_054dfd1817" tabindex="-1" value=""></div><div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"></div>
    </div>
</form>
</div>
<script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='COMPANY';ftypes[6]='text';fnames[7]='MMERGE1';ftypes[7]='text';fnames[8]='MMERGE2';ftypes[8]='phone';fnames[9]='MMERGE3';ftypes[9]='text';fnames[10]='MMERGE4';ftypes[10]='text';fnames[11]='MMERGE5';ftypes[11]='text';fnames[12]='MMERGE6';ftypes[12]='text';fnames[13]='MMERGE7';ftypes[13]='url';}(jQuery));var $mcj = jQuery.noConflict(true);
    // SMS Phone Multi-Country Functionality
    if(!window.MC) {
      window.MC = {};
    }
    window.MC.smsPhoneData = {
      defaultCountryCode: 'BE',
      programs: [],
      smsProgramDataCountryNames: []
    };

    function getCountryUnicodeFlag(countryCode) {
       return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    };

    // HTML sanitization function to prevent XSS
    function sanitizeHtml(str) {
      if (typeof str !== 'string') return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    }

    // URL sanitization function to prevent javascript: and data: URLs
    function sanitizeUrl(url) {
      if (typeof url !== 'string') return '';
      const trimmedUrl = url.trim().toLowerCase();
      if (trimmedUrl.startsWith('javascript:') || trimmedUrl.startsWith('data:') || trimmedUrl.startsWith('vbscript:')) {
        return '#';
      }
      return url;
    }

    const getBrowserLanguage = () => {
      if (!window?.navigator?.language?.split('-')[1]) {
        return window?.navigator?.language?.toUpperCase();
      }
      return window?.navigator?.language?.split('-')[1];
    };

    function getDefaultCountryProgram(defaultCountryCode, smsProgramData) {
      if (!smsProgramData || smsProgramData.length === 0) {
        return null;
      }

      const browserLanguage = getBrowserLanguage();

      if (browserLanguage) {
        const foundProgram = smsProgramData.find(
          (program) => program?.countryCode === browserLanguage,
        );
        if (foundProgram) {
          return foundProgram;
        }
      }

      if (defaultCountryCode) {
        const foundProgram = smsProgramData.find(
          (program) => program?.countryCode === defaultCountryCode,
        );
        if (foundProgram) {
          return foundProgram;
        }
      }

      return smsProgramData[0];
    }

    function updateSmsLegalText(countryCode, fieldName) {
      if (!countryCode || !fieldName) {
        return;
      }
      
      const programs = window?.MC?.smsPhoneData?.programs;
      if (!programs || !Array.isArray(programs)) {
        return;
      }
      
      const program = programs.find(program => program?.countryCode === countryCode);
      if (!program || !program.requiredTemplate) {
        return;
      }
      
      const legalTextElement = document.querySelector('#legal-text-' + fieldName);
      if (!legalTextElement) {
        return;
      }
      
      // Remove HTML tags and clean up the text
      const divRegex = new RegExp('</?[div][^>]*>', 'gi');
      const fullAnchorRegex = new RegExp('<a.*?</a>', 'g');
      const anchorRegex = new RegExp('<a href="(.*?)" target="(.*?)">(.*?)</a>');
      
      const template = program.requiredTemplate.replace(divRegex, '');
      
      

      legalTextElement.textContent = '';
      const parts = template.split(/(<a href=".*?" target=".*?">.*?<\/a>)/g);
      parts.forEach(function(part) {
        if (!part) {
          return;
        }
        const anchorMatch = part.match(/<a href="(.*?)" target="(.*?)">(.*?)<\/a>/);
        if (anchorMatch) {
          const linkElement = document.createElement('a');
          linkElement.href = sanitizeUrl(anchorMatch[1]);
          linkElement.target = sanitizeHtml(anchorMatch[2]);
          linkElement.textContent = sanitizeHtml(anchorMatch[3]);
          legalTextElement.appendChild(linkElement);
        } else {
          legalTextElement.appendChild(document.createTextNode(part));
        }
      });
          
    }

    function generateDropdownOptions(smsProgramData) {
      if (!smsProgramData || smsProgramData.length === 0) {
        return '';
      }
      
      return smsProgramData.map(program => {
        const flag = getCountryUnicodeFlag(program.countryCode);
        const countryName = getCountryName(program.countryCode);
        const callingCode = program.countryCallingCode || '';
        // Sanitize all values to prevent XSS
        const sanitizedCountryCode = sanitizeHtml(program.countryCode || '');
        const sanitizedCountryName = sanitizeHtml(countryName || '');
        const sanitizedCallingCode = sanitizeHtml(callingCode || '');
        return '<option value="' + sanitizedCountryCode + '">' + sanitizedCountryName + ' ' + sanitizedCallingCode + '</option>';
      }).join('');
    }

    function getCountryName(countryCode) {
      if (window.MC?.smsPhoneData?.smsProgramDataCountryNames && Array.isArray(window.MC.smsPhoneData.smsProgramDataCountryNames)) {
        for (let i = 0; i < window.MC.smsPhoneData.smsProgramDataCountryNames.length; i++) {
          if (window.MC.smsPhoneData.smsProgramDataCountryNames[i].code === countryCode) {
            return window.MC.smsPhoneData.smsProgramDataCountryNames[i].name;
          }
        }
      }
      return countryCode;
    }

    function getDefaultPlaceholder(countryCode) {
      if (!countryCode || typeof countryCode !== 'string') {
        return '+1 000 000 0000'; // Default US placeholder
      }
      
            var mockPlaceholders = [
        {
          countryCode: 'US',
          placeholder: '+1 000 000 0000',
          helpText: 'Include the US country code +1 before the phone number',
        },
        {
          countryCode: 'GB',
          placeholder: '+44 0000 000000',
          helpText: 'Include the GB country code +44 before the phone number',
        },
        {
          countryCode: 'CA',
          placeholder: '+1 000 000 0000',
          helpText: 'Include the CA country code +1 before the phone number',
        },
        {
          countryCode: 'AU',
          placeholder: '+61 000 000 000',
          helpText: 'Include the AU country code +61 before the phone number',
        },
        {
          countryCode: 'DE',
          placeholder: '+49 000 0000000',
          helpText: 'Fügen Sie vor der Telefonnummer die DE-Ländervorwahl +49 ein',
        },
        {
          countryCode: 'FR',
          placeholder: '+33 0 00 00 00 00',
          helpText: 'Incluez le code pays FR +33 avant le numéro de téléphone',
        },
        {
          countryCode: 'ES',
          placeholder: '+34 000 000 000',
          helpText: 'Incluya el código de país ES +34 antes del número de teléfono',
        },
        {
          countryCode: 'NL',
          placeholder: '+31 0 00000000',
          helpText: 'Voeg de NL-landcode +31 toe vóór het telefoonnummer',
        },
        {
          countryCode: 'BE',
          placeholder: '+32 000 00 00 00',
          helpText: 'Incluez le code pays BE +32 avant le numéro de téléphone',
        },
        {
          countryCode: 'CH',
          placeholder: '+41 00 000 00 00',
          helpText: 'Fügen Sie vor der Telefonnummer die CH-Ländervorwahl +41 ein',
        },
        {
          countryCode: 'AT',
          placeholder: '+43 000 000 0000',
          helpText: 'Fügen Sie vor der Telefonnummer die AT-Ländervorwahl +43 ein',
        },
        {
          countryCode: 'IE',
          placeholder: '+353 00 000 0000',
          helpText: 'Include the IE country code +353 before the phone number',
        },
        {
          countryCode: 'IT',
          placeholder: '+39 000 000 0000',
          helpText: 'Includere il prefisso internazionale IT +39 prima del numero di telefono',
        },
      ];

      const selectedPlaceholder = mockPlaceholders.find(function(item) {
        return item && item.countryCode === countryCode;
      });
      
      return selectedPlaceholder ? selectedPlaceholder.placeholder : mockPlaceholders[0].placeholder;
    }

    function updatePlaceholder(countryCode, fieldName) {
      if (!countryCode || !fieldName) {
        return;
      }
      
      const phoneInput = document.querySelector('#mce-' + fieldName);
      if (!phoneInput) {
        return;
      }
      
      const placeholder = getDefaultPlaceholder(countryCode);
      if (placeholder) {
        phoneInput.placeholder = placeholder;
      }
    }

    function updateCountryCodeInstruction(countryCode, fieldName) {
      updatePlaceholder(countryCode, fieldName);
      
    }

    function getDefaultHelpText(countryCode) {
      var mockPlaceholders = [
        {
          countryCode: 'US',
          placeholder: '+1 000 000 0000',
          helpText: 'Include the US country code +1 before the phone number',
        },
        {
          countryCode: 'GB',
          placeholder: '+44 0000 000000',
          helpText: 'Include the GB country code +44 before the phone number',
        },
        {
          countryCode: 'CA',
          placeholder: '+1 000 000 0000',
          helpText: 'Include the CA country code +1 before the phone number',
        },
        {
          countryCode: 'AU',
          placeholder: '+61 000 000 000',
          helpText: 'Include the AU country code +61 before the phone number',
        },
        {
          countryCode: 'DE',
          placeholder: '+49 000 0000000',
          helpText: 'Fügen Sie vor der Telefonnummer die DE-Ländervorwahl +49 ein',
        },
        {
          countryCode: 'FR',
          placeholder: '+33 0 00 00 00 00',
          helpText: 'Incluez le code pays FR +33 avant le numéro de téléphone',
        },
        {
          countryCode: 'ES',
          placeholder: '+34 000 000 000',
          helpText: 'Incluya el código de país ES +34 antes del número de teléfono',
        },
        {
          countryCode: 'NL',
          placeholder: '+31 0 00000000',
          helpText: 'Voeg de NL-landcode +31 toe vóór het telefoonnummer',
        },
        {
          countryCode: 'BE',
          placeholder: '+32 000 00 00 00',
          helpText: 'Incluez le code pays BE +32 avant le numéro de téléphone',
        },
        {
          countryCode: 'CH',
          placeholder: '+41 00 000 00 00',
          helpText: 'Fügen Sie vor der Telefonnummer die CH-Ländervorwahl +41 ein',
        },
        {
          countryCode: 'AT',
          placeholder: '+43 000 000 0000',
          helpText: 'Fügen Sie vor der Telefonnummer die AT-Ländervorwahl +43 ein',
        },
        {
          countryCode: 'IE',
          placeholder: '+353 00 000 0000',
          helpText: 'Include the IE country code +353 before the phone number',
        },
        {
          countryCode: 'IT',
          placeholder: '+39 000 000 0000',
          helpText: 'Includere il prefisso internazionale IT +39 prima del numero di telefono',
        },
      ];
      
      if (!countryCode || typeof countryCode !== 'string') {
        return mockPlaceholders[0].helpText;
      }
      
      const selectedHelpText = mockPlaceholders.find(function(item) {
          return item && item.countryCode === countryCode;
        });
        
        return selectedHelpText ? selectedHelpText.helpText : mockPlaceholders[0].helpText;
    }

    function setDefaultHelpText(countryCode) {
      const helpTextSpan = document.querySelector('#help-text');
      if (!helpTextSpan) {
        return;
      }

        
    }

    function updateHelpTextCountryCode(countryCode, fieldName) {
      if (!countryCode || !fieldName) {
        return;
      }
      
      setDefaultHelpText(countryCode);
    }

    function initializeSmsPhoneDropdown(fieldName) {
      if (!fieldName || typeof fieldName !== 'string') {
        return;
      }
      
      const dropdown = document.querySelector('#country-select-' + fieldName);
      const displayFlag = document.querySelector('#flag-display-' + fieldName);
      
      if (!dropdown || !displayFlag) {
        return;
      }

      const smsPhoneData = window.MC?.smsPhoneData;
      if (smsPhoneData && smsPhoneData.programs && Array.isArray(smsPhoneData.programs)) {
        dropdown.innerHTML = generateDropdownOptions(smsPhoneData.programs);
      }

      const defaultProgram = getDefaultCountryProgram(smsPhoneData?.defaultCountryCode, smsPhoneData?.programs);
      if (defaultProgram && defaultProgram.countryCode) {
        dropdown.value = defaultProgram.countryCode;
        
        const flagSpan = displayFlag?.querySelector('#flag-emoji-' + fieldName);
        if (flagSpan) {
          flagSpan.textContent = getCountryUnicodeFlag(defaultProgram.countryCode);
          flagSpan.setAttribute('aria-label', sanitizeHtml(defaultProgram.countryCode) + ' flag');
        }
        
        updateSmsLegalText(defaultProgram.countryCode, fieldName);
        updatePlaceholder(defaultProgram.countryCode, fieldName);
        updateCountryCodeInstruction(defaultProgram.countryCode, fieldName);
      }

     
      var smsNotRequiredRemoveCountryCodeEnabled = true;
      var smsField = Object.values({"EMAIL":{"name":"EMAIL","label":"Email Address","helper_text":"","merge_id":0,"type":"email","required":true,"audience_field_name":"Email Address","field_type":"merge","enabled":true,"order":0},"FNAME":{"name":"FNAME","label":"First Name","helper_text":"","type":"text","required":false,"audience_field_name":"First Name","enabled":false,"order":null,"field_type":"merge","merge_id":1},"LNAME":{"name":"LNAME","label":"Last Name","helper_text":"","type":"text","required":false,"audience_field_name":"Last Name","enabled":false,"order":null,"field_type":"merge","merge_id":2},"ADDRESS":{"name":"ADDRESS","label":"Address","helper_text":"","type":"address","required":false,"audience_field_name":"Address","enabled":false,"order":null,"field_type":"merge","merge_id":3,"countries":{"2":"Albania","3":"Algeria","4":"Andorra","5":"Angola","6":"Argentina","7":"Armenia","8":"Australia","9":"Austria","10":"Azerbaijan","11":"Bahamas","12":"Bahrain","13":"Bangladesh","14":"Barbados","15":"Belarus","16":"Belgium","17":"Belize","18":"Benin","19":"Bermuda","20":"Bhutan","21":"Bolivia","22":"Bosnia and Herzegovina","23":"Botswana","24":"Brazil","25":"Bulgaria","26":"Burkina Faso","27":"Burundi","28":"Cambodia","29":"Cameroon","30":"Canada","31":"Cape Verde","32":"Cayman Islands","33":"Central African Republic","34":"Chad","35":"Chile","36":"China","37":"Colombia","38":"Congo","40":"Croatia","41":"Cyprus","42":"Czech Republic","43":"Denmark","44":"Djibouti","45":"Ecuador","46":"Egypt","47":"El Salvador","48":"Equatorial Guinea","49":"Eritrea","50":"Estonia","51":"Ethiopia","52":"Fiji","53":"Finland","54":"France","56":"Gabon","57":"Gambia","58":"Georgia","59":"Germany","60":"Ghana","61":"Greece","62":"Guam","63":"Guinea","64":"Guinea-Bissau","65":"Guyana","66":"Honduras","67":"Hong Kong","68":"Hungary","69":"Iceland","70":"India","71":"Indonesia","74":"Ireland","75":"Israel","76":"Italy","78":"Japan","79":"Jordan","80":"Kazakhstan","81":"Kenya","82":"Kuwait","83":"Kyrgyzstan","84":"Lao People's Democratic Republic","85":"Latvia","86":"Lebanon","87":"Lesotho","88":"Liberia","90":"Liechtenstein","91":"Lithuania","92":"Luxembourg","93":"Macedonia","94":"Madagascar","95":"Malawi","96":"Malaysia","97":"Maldives","98":"Mali","99":"Malta","100":"Mauritania","101":"Mexico","102":"Moldova","103":"Monaco","104":"Mongolia","105":"Morocco","106":"Mozambique","107":"Namibia","108":"Nepal","109":"Netherlands","110":"Netherlands Antilles","111":"New Zealand","112":"Nicaragua","113":"Niger","114":"Nigeria","116":"Norway","117":"Oman","118":"Pakistan","119":"Panama","120":"Paraguay","121":"Peru","122":"Philippines","123":"Poland","124":"Portugal","126":"Qatar","127":"Reunion","128":"Romania","129":"Russia","130":"Rwanda","132":"Samoa (Independent)","133":"Saudi Arabia","134":"Senegal","135":"Seychelles","136":"Sierra Leone","137":"Singapore","138":"Slovakia","139":"Slovenia","140":"Somalia","141":"South Africa","142":"South Korea","143":"Spain","144":"Sri Lanka","146":"Suriname","147":"Swaziland","148":"Sweden","149":"Switzerland","152":"Taiwan","153":"Tanzania","154":"Thailand","155":"Togo","156":"Tunisia","157":"Turkiye","158":"Turkmenistan","159":"Uganda","161":"Ukraine","162":"United Arab Emirates","163":"Uruguay","164":"USA","165":"Uzbekistan","166":"Vatican City State (Holy See)","167":"Venezuela","168":"Vietnam","169":"Virgin Islands (British)","170":"Yemen","173":"Zambia","174":"Zimbabwe","175":"Antigua And Barbuda","176":"Anguilla","178":"American Samoa","179":"Aruba","180":"Brunei Darussalam","181":"Bouvet Island","183":"Cook Islands","185":"Christmas Island","187":"Dominican Republic","188":"Western Sahara","189":"Falkland Islands","191":"Faroe Islands","192":"Grenada","193":"French Guiana","194":"Gibraltar","195":"Greenland","196":"Guadeloupe","198":"Guatemala","200":"Haiti","202":"Jamaica","203":"Kiribati","204":"Comoros","205":"Saint Kitts and Nevis","206":"Saint Lucia","207":"Marshall Islands","208":"Macau","210":"Martinique","212":"Mauritius","213":"New Caledonia","214":"Norfolk Island","215":"Nauru","217":"Niue","219":"Papua New Guinea","221":"Pitcairn","222":"Palau","223":"Solomon Islands","225":"Svalbard and Jan Mayen Islands","227":"San Marino","232":"Tonga","233":"Timor-Leste","234":"Trinidad and Tobago","235":"Tuvalu","237":"Saint Vincent and the Grenadines","238":"Virgin Islands (U.S.)","239":"Vanuatu","241":"Mayotte","242":"Myanmar","255":"Sao Tome and Principe","257":"South Georgia and the South Sandwich Islands","260":"Tajikistan","262":"United Kingdom","268":"Costa Rica","270":"Guernsey","272":"North Korea","274":"Afghanistan","275":"Cote D'Ivoire","276":"Cuba","277":"French Polynesia","278":"Iran","279":"Iraq","281":"Libya","282":"Palestine","285":"Syria","286":"Aaland Islands","287":"Turks & Caicos Islands","288":"Jersey  (Channel Islands)","289":"Dominica","290":"Montenegro","293":"Sudan","294":"Montserrat","298":"Curacao","302":"Sint Maarten","311":"South Sudan","315":"Republic of Kosovo","318":"Congo, Democratic Republic of the","323":"Isle of Man","324":"Saint Martin","325":"Bonaire, Saint Eustatius and Saba","326":"Serbia"},"defaultcountry":164},"PHONE":{"name":"PHONE","label":"Phone Number","helper_text":"","type":"phone","required":false,"audience_field_name":"Phone Number","phoneformat":"","enabled":false,"order":null,"field_type":"merge","merge_id":4},"BIRTHDAY":{"name":"BIRTHDAY","label":"Birthday","helper_text":"","type":"birthday","required":false,"audience_field_name":"Birthday","dateformat":"MM/DD","enabled":false,"order":null,"field_type":"merge","merge_id":5},"COMPANY":{"name":"COMPANY","label":"Company","helper_text":"","type":"text","required":false,"audience_field_name":"Company","enabled":false,"order":null,"field_type":"merge","merge_id":6},"MMERGE1":{"name":"MMERGE1","label":"Business Name","helper_text":"","type":"text","required":false,"audience_field_name":"Business Name","enabled":false,"order":null,"field_type":"merge","merge_id":7},"MMERGE2":{"name":"MMERGE2","label":"Phone","helper_text":"","type":"phone","required":false,"audience_field_name":"Phone","phoneformat":"none","enabled":false,"order":null,"field_type":"merge","merge_id":8},"MMERGE3":{"name":"MMERGE3","label":"Business Description","helper_text":"","type":"text","required":false,"audience_field_name":"Business Description","enabled":false,"order":null,"field_type":"merge","merge_id":9},"MMERGE4":{"name":"MMERGE4","label":"Package Interest","helper_text":"","type":"text","required":false,"audience_field_name":"Package Interest","enabled":false,"order":null,"field_type":"merge","merge_id":10},"MMERGE5":{"name":"MMERGE5","label":"Package Other","helper_text":"","type":"text","required":false,"audience_field_name":"Package Other","enabled":false,"order":null,"field_type":"merge","merge_id":11},"MMERGE6":{"name":"MMERGE6","label":"Has Existing Website","helper_text":"","type":"text","required":false,"audience_field_name":"Has Existing Website","enabled":false,"order":null,"field_type":"merge","merge_id":12},"MMERGE7":{"name":"MMERGE7","label":"Existing Website URL","helper_text":"","type":"url","required":false,"audience_field_name":"Existing Website URL","enabled":false,"order":null,"field_type":"merge","merge_id":13}}).find(function(f) { return f.name === fieldName && f.type === 'smsphone'; });
      var isRequired = smsField ? smsField.required : false;
      var shouldAppendCountryCode = smsNotRequiredRemoveCountryCodeEnabled ? isRequired : true;
      
      var phoneInput = document.querySelector('#mce-' + fieldName);
      if (phoneInput && defaultProgram.countryCallingCode && shouldAppendCountryCode) {
        phoneInput.value = defaultProgram.countryCallingCode;
      }
      


      displayFlag?.addEventListener('click', function(e) {
        dropdown.focus();
      });


      dropdown?.addEventListener('change', function() {
        const selectedCountry = this.value;
        
        if (!selectedCountry || typeof selectedCountry !== 'string') {
          return;
        }
        
        const flagSpan = displayFlag?.querySelector('#flag-emoji-' + fieldName);
        if (flagSpan) {
          flagSpan.textContent = getCountryUnicodeFlag(selectedCountry);
          flagSpan.setAttribute('aria-label', sanitizeHtml(selectedCountry) + ' flag');
        }

         
        const selectedProgram = window.MC?.smsPhoneData?.programs.find(function(program) {
          return program && program.countryCode === selectedCountry;
        });

        var smsNotRequiredRemoveCountryCodeEnabled = true;
        var smsField = Object.values({"EMAIL":{"name":"EMAIL","label":"Email Address","helper_text":"","merge_id":0,"type":"email","required":true,"audience_field_name":"Email Address","field_type":"merge","enabled":true,"order":0},"FNAME":{"name":"FNAME","label":"First Name","helper_text":"","type":"text","required":false,"audience_field_name":"First Name","enabled":false,"order":null,"field_type":"merge","merge_id":1},"LNAME":{"name":"LNAME","label":"Last Name","helper_text":"","type":"text","required":false,"audience_field_name":"Last Name","enabled":false,"order":null,"field_type":"merge","merge_id":2},"ADDRESS":{"name":"ADDRESS","label":"Address","helper_text":"","type":"address","required":false,"audience_field_name":"Address","enabled":false,"order":null,"field_type":"merge","merge_id":3,"countries":{"2":"Albania","3":"Algeria","4":"Andorra","5":"Angola","6":"Argentina","7":"Armenia","8":"Australia","9":"Austria","10":"Azerbaijan","11":"Bahamas","12":"Bahrain","13":"Bangladesh","14":"Barbados","15":"Belarus","16":"Belgium","17":"Belize","18":"Benin","19":"Bermuda","20":"Bhutan","21":"Bolivia","22":"Bosnia and Herzegovina","23":"Botswana","24":"Brazil","25":"Bulgaria","26":"Burkina Faso","27":"Burundi","28":"Cambodia","29":"Cameroon","30":"Canada","31":"Cape Verde","32":"Cayman Islands","33":"Central African Republic","34":"Chad","35":"Chile","36":"China","37":"Colombia","38":"Congo","40":"Croatia","41":"Cyprus","42":"Czech Republic","43":"Denmark","44":"Djibouti","45":"Ecuador","46":"Egypt","47":"El Salvador","48":"Equatorial Guinea","49":"Eritrea","50":"Estonia","51":"Ethiopia","52":"Fiji","53":"Finland","54":"France","56":"Gabon","57":"Gambia","58":"Georgia","59":"Germany","60":"Ghana","61":"Greece","62":"Guam","63":"Guinea","64":"Guinea-Bissau","65":"Guyana","66":"Honduras","67":"Hong Kong","68":"Hungary","69":"Iceland","70":"India","71":"Indonesia","74":"Ireland","75":"Israel","76":"Italy","78":"Japan","79":"Jordan","80":"Kazakhstan","81":"Kenya","82":"Kuwait","83":"Kyrgyzstan","84":"Lao People's Democratic Republic","85":"Latvia","86":"Lebanon","87":"Lesotho","88":"Liberia","90":"Liechtenstein","91":"Lithuania","92":"Luxembourg","93":"Macedonia","94":"Madagascar","95":"Malawi","96":"Malaysia","97":"Maldives","98":"Mali","99":"Malta","100":"Mauritania","101":"Mexico","102":"Moldova","103":"Monaco","104":"Mongolia","105":"Morocco","106":"Mozambique","107":"Namibia","108":"Nepal","109":"Netherlands","110":"Netherlands Antilles","111":"New Zealand","112":"Nicaragua","113":"Niger","114":"Nigeria","116":"Norway","117":"Oman","118":"Pakistan","119":"Panama","120":"Paraguay","121":"Peru","122":"Philippines","123":"Poland","124":"Portugal","126":"Qatar","127":"Reunion","128":"Romania","129":"Russia","130":"Rwanda","132":"Samoa (Independent)","133":"Saudi Arabia","134":"Senegal","135":"Seychelles","136":"Sierra Leone","137":"Singapore","138":"Slovakia","139":"Slovenia","140":"Somalia","141":"South Africa","142":"South Korea","143":"Spain","144":"Sri Lanka","146":"Suriname","147":"Swaziland","148":"Sweden","149":"Switzerland","152":"Taiwan","153":"Tanzania","154":"Thailand","155":"Togo","156":"Tunisia","157":"Turkiye","158":"Turkmenistan","159":"Uganda","161":"Ukraine","162":"United Arab Emirates","163":"Uruguay","164":"USA","165":"Uzbekistan","166":"Vatican City State (Holy See)","167":"Venezuela","168":"Vietnam","169":"Virgin Islands (British)","170":"Yemen","173":"Zambia","174":"Zimbabwe","175":"Antigua And Barbuda","176":"Anguilla","178":"American Samoa","179":"Aruba","180":"Brunei Darussalam","181":"Bouvet Island","183":"Cook Islands","185":"Christmas Island","187":"Dominican Republic","188":"Western Sahara","189":"Falkland Islands","191":"Faroe Islands","192":"Grenada","193":"French Guiana","194":"Gibraltar","195":"Greenland","196":"Guadeloupe","198":"Guatemala","200":"Haiti","202":"Jamaica","203":"Kiribati","204":"Comoros","205":"Saint Kitts and Nevis","206":"Saint Lucia","207":"Marshall Islands","208":"Macau","210":"Martinique","212":"Mauritius","213":"New Caledonia","214":"Norfolk Island","215":"Nauru","217":"Niue","219":"Papua New Guinea","221":"Pitcairn","222":"Palau","223":"Solomon Islands","225":"Svalbard and Jan Mayen Islands","227":"San Marino","232":"Tonga","233":"Timor-Leste","234":"Trinidad and Tobago","235":"Tuvalu","237":"Saint Vincent and the Grenadines","238":"Virgin Islands (U.S.)","239":"Vanuatu","241":"Mayotte","242":"Myanmar","255":"Sao Tome and Principe","257":"South Georgia and the South Sandwich Islands","260":"Tajikistan","262":"United Kingdom","268":"Costa Rica","270":"Guernsey","272":"North Korea","274":"Afghanistan","275":"Cote D'Ivoire","276":"Cuba","277":"French Polynesia","278":"Iran","279":"Iraq","281":"Libya","282":"Palestine","285":"Syria","286":"Aaland Islands","287":"Turks & Caicos Islands","288":"Jersey  (Channel Islands)","289":"Dominica","290":"Montenegro","293":"Sudan","294":"Montserrat","298":"Curacao","302":"Sint Maarten","311":"South Sudan","315":"Republic of Kosovo","318":"Congo, Democratic Republic of the","323":"Isle of Man","324":"Saint Martin","325":"Bonaire, Saint Eustatius and Saba","326":"Serbia"},"defaultcountry":164},"PHONE":{"name":"PHONE","label":"Phone Number","helper_text":"","type":"phone","required":false,"audience_field_name":"Phone Number","phoneformat":"","enabled":false,"order":null,"field_type":"merge","merge_id":4},"BIRTHDAY":{"name":"BIRTHDAY","label":"Birthday","helper_text":"","type":"birthday","required":false,"audience_field_name":"Birthday","dateformat":"MM/DD","enabled":false,"order":null,"field_type":"merge","merge_id":5},"COMPANY":{"name":"COMPANY","label":"Company","helper_text":"","type":"text","required":false,"audience_field_name":"Company","enabled":false,"order":null,"field_type":"merge","merge_id":6},"MMERGE1":{"name":"MMERGE1","label":"Business Name","helper_text":"","type":"text","required":false,"audience_field_name":"Business Name","enabled":false,"order":null,"field_type":"merge","merge_id":7},"MMERGE2":{"name":"MMERGE2","label":"Phone","helper_text":"","type":"phone","required":false,"audience_field_name":"Phone","phoneformat":"none","enabled":false,"order":null,"field_type":"merge","merge_id":8},"MMERGE3":{"name":"MMERGE3","label":"Business Description","helper_text":"","type":"text","required":false,"audience_field_name":"Business Description","enabled":false,"order":null,"field_type":"merge","merge_id":9},"MMERGE4":{"name":"MMERGE4","label":"Package Interest","helper_text":"","type":"text","required":false,"audience_field_name":"Package Interest","enabled":false,"order":null,"field_type":"merge","merge_id":10},"MMERGE5":{"name":"MMERGE5","label":"Package Other","helper_text":"","type":"text","required":false,"audience_field_name":"Package Other","enabled":false,"order":null,"field_type":"merge","merge_id":11},"MMERGE6":{"name":"MMERGE6","label":"Has Existing Website","helper_text":"","type":"text","required":false,"audience_field_name":"Has Existing Website","enabled":false,"order":null,"field_type":"merge","merge_id":12},"MMERGE7":{"name":"MMERGE7","label":"Existing Website URL","helper_text":"","type":"url","required":false,"audience_field_name":"Existing Website URL","enabled":false,"order":null,"field_type":"merge","merge_id":13}}).find(function(f) { return f.name === fieldName && f.type === 'smsphone'; });
        var isRequired = smsField ? smsField.required : false;
        var shouldAppendCountryCode = smsNotRequiredRemoveCountryCodeEnabled ? isRequired : true;
        
        var phoneInput = document.querySelector('#mce-' + fieldName);
        if (phoneInput && selectedProgram.countryCallingCode && shouldAppendCountryCode) {
          phoneInput.value = selectedProgram.countryCallingCode;
        }
        
        
        updateSmsLegalText(selectedCountry, fieldName);
        updatePlaceholder(selectedCountry, fieldName);
        updateCountryCodeInstruction(selectedCountry, fieldName);
      });
    }

    document.addEventListener('DOMContentLoaded', function() {
      const smsPhoneFields = document.querySelectorAll('[id^="country-select-"]');
      
      smsPhoneFields.forEach(function(dropdown) {
        const fieldName = dropdown?.id.replace('country-select-', '');
        initializeSmsPhoneDropdown(fieldName);
      });
    });
    </script></div>`
      },
      {
        type: 'heading',
        content: 'De gemene deler: Meer tijd voor kwaliteit',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Of je nu werkt met je handen, met cijfers of met mensen: de integratie van AI zorgt voor een \'lean\' workflow. Het haalt de frictie uit je proces en zorgt ervoor dat de randzaken zichzelf regelen. Bij Studio Thielman kijken we graag samen met jou hoe we deze moderne technologieën kunnen vertalen naar een oplossing die écht de naald beweegt voor jouw onderneming.'
      },
      {
        type: 'paragraph',
        content: 'Benieuwd hoe AI jouw specifieke sector kan transformeren? Laten we eens sparren over de mogelijkheden.'
      }
    ],
    cta: {
      text: 'Laten we samen kijken hoe AI jouw bedrijf kan helpen – neem contact op!',
      link: '/contact'
    }
  },
  {
    slug: 'hoe-wij-impact-maken-ons-proces-voor-succesvolle-digitale-projecten',
    title: 'Hoe wij impact maken: Ons proces voor succesvolle digitale projecten',
    excerpt: 'Als web- en softwareontwikkelaars weten we één ding zeker: een aantrekkelijk design is een mooi begin, maar een platform dat écht rendeert en met je meegroeit is de uiteindelijke winst. Dat verschil maken wij door middel van een doordacht en transparant stappenplan.',
    date: 'JAN 2026',
    visibleFrom: '2026-02-01', // Hidden until February 1st, 2026
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop&q=80', // Person working on laptop
    sections: [
      {
        type: 'paragraph',
        content: 'Als web- en softwareontwikkelaars weten we één ding zeker: een aantrekkelijk design is een mooi begin, maar een platform dat écht rendeert en met je meegroeit is de uiteindelijke winst. Dat verschil maken wij door middel van een doordacht en transparant stappenplan. In deze blog nemen we je mee achter de schermen van onze werkwijze en ontdek je hoe we elk project van de eerste schets tot de uiteindelijke lancering naar een topresultaat begeleiden.'
      },
      {
        type: 'heading',
        content: 'De fundering van een sterk project',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Veel bureaus maken de fout om direct in het visuele ontwerp te duiken zonder de essentie van een bedrijf te doorgronden. Wij pakken het fundamenteel anders aan. Ons proces is erop ingericht dat elke creatieve of technische beslissing gegrond is in jouw specifieke bedrijfsdoelen en de behoeften van je eindgebruiker. Zo voorkomen we gokwerk en bouwen we aan een resultaat dat niet alleen vandaag werkt, maar ook klaar is voor de uitdagingen van morgen.'
      },
      {
        type: 'heading',
        content: 'Fase 1: Discovery & Strategie',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Alles begint bij het stellen van de juiste vragen. In de strategische fase graven we diep in de kern van jouw organisatie. We onderzoeken wie je doelgroep is en tegen welke pijnpunten zij aanlopen, maar kijken ook kritisch naar wat jou onderscheidt van de concurrentie. Of het doel nu meer directe verkoop, kwalitatieve leads of een efficiënter boekingssysteem is: we leggen de KPI\'s vast die er écht toe doen. Het resultaat van deze fase is een helder strategisch document dat als blauwdruk dient voor alles wat volgt. Zonder deze sterke strategie bouwen we blind, en dat is precies wat we voorkomen.'
      },
      {
        type: 'heading',
        content: 'Fase 2: Architectuur en de User Journey',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Met de strategie als leidraad vertalen we de plannen naar een logische structuur. Dit begint bij de sitemap, waarbij we de hiërarchie en de onderlinge samenhang van alle pagina\'s bepalen. Vervolgens werken we dit uit in wireframes: functionele bouwtekeningen waarin we de indeling vastleggen zonder de afleiding van kleur of beeld. Hierin staat de \'User Journey\' centraal. We zorgen ervoor dat bezoekers intuïtief hun weg vinden en binnen enkele klikken op hun bestemming aankomen. Zie het als de architectuur van een gebouw; pas als de muren en de routing kloppen, kijken we naar de inrichting.'
      },
      {
        type: 'heading',
        content: 'Fase 3: Content als drijvende kracht',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Een website zonder sterke inhoud is als een huls zonder kern. Daarom besteden we uitgebreid aandacht aan de content-voorbereiding. Samen kijken we welke teksten en Calls-to-Action de meeste impact maken en welke visuele elementen, zoals fotografie en video, jouw merkversterken. We schrijven en selecteren content met de eindgebruiker in gedachten, terwijl we tegelijkertijd zorgen dat alles technisch geoptimaliseerd is voor zoekmachines (SEO). Zo spreekt de website zowel je klant als Google aan.'
      },
      {
        type: 'heading',
        content: 'Fase 4: Design & Brand Expression',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Pas als de structuur en de inhoud staan, brengen we het project visueel tot leven. Het design is bij Studio Thielman veel meer dan een verzameling mooie plaatjes; het is een doordachte vertaling van je merkidentiteit. We creëren een unieke visuele taal met zorgvuldig gekozen typografie, kleuren en witruimtes die op elk device — van smartphone tot desktop — perfect tot hun recht komen. Elke pixel heeft een functie en draagt bij aan een consistente, professionele ervaring die vertrouwen wekt bij je bezoekers.'
      },
      {
        type: 'heading',
        content: 'Fase 5: Development & De bouw',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Zodra het ontwerp staat, nemen onze developers het stokje over. Afhankelijk van jouw specifieke behoeften kiezen we de juiste tech-stack, of dat nu een flexibel WordPress-systeem, een moderne React-oplossing of een krachtig Headless CMS is. We bouwen volgens een \'performance-first\' principe: dat betekent razendsnelle laadtijden, schone code zonder overbodige ballast en een ijzersterke beveiliging. Jouw website wordt gebouwd als een geoliede machine die moeiteloos presteert onder druk.'
      },
      {
        type: 'heading',
        content: 'Fase 6: Kwaliteitscontrole en Lancering',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Voordat we de wereld laten zien wat we gemaakt hebben, onderwerpen we het project aan een strenge keuring. Tijdens deze testing-fase controleren we of elke link, elk formulier en elke koppeling vlekkeloos werkt. We testen de snelheid op verschillende browsers en zorgen dat de mobiele ervaring op elk type scherm foutloos is. Pas als we zeker weten dat alles optimaal functioneert, drukken we op de knop voor de livegang.'
      },
      {
        type: 'heading',
        content: 'Fase 7: Groei en Optimalisatie',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'De lancering is voor ons niet het eindpunt, maar juist het begin. Een succesvolle website is een levend bezit dat aandacht nodig heeft om te blijven groeien. Na de livegang blijven we betrokken door de prestaties nauwgezet te monitoren. We analyseren het gedrag van gebruikers en voeren op basis van die data verbeteringen door. Door middel van periodiek onderhoud en proactieve support zorgen we ervoor dat je platform altijd veilig, snel en relevant blijft.'
      },
      {
        type: 'heading',
        content: 'Waarom deze aanpak werkt',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Onze werkwijze rust op drie belangrijke pijlers: strategie boven esthetiek, echte samenwerking en een moderne, lean bouw. We bouwen eerst de motor van je digitale business en zorgen daarna pas voor het glimmende lakwerk. Daarbij werken we niet simpelweg voor jou, maar echt met jou; jouw expertise in je eigen vakgebied is immers onmisbaar voor het beste resultaat. Door te kiezen voor moderne technieken en een eerlijk proces, leveren we een platform dat niet alleen vandaag indruk maakt, maar ook klaar is voor de toekomst.'
      },
      {
        type: 'paragraph',
        content: 'Benieuwd hoe we dit proces kunnen inzetten voor jouw volgende digitale uitdaging?'
      }
    ],
    cta: {
      text: 'Laten we samen jouw digitale project tot een succes maken – neem contact op!',
      link: '/contact'
    }
  },
  {
    slug: 'waarom-website-online-zichtbaarheid-niet-meer-mogen-ontbreken',
    title: 'Waarom een website en online zichtbaarheid echt niet meer mogen ontbreken voor je zaak',
    excerpt: 'Stel je voor: iemand in jouw buurt heeft dringend een loodgieter, kapper of webdesigner nodig. Wat doet die persoon? Juist, smartphone bovenhalen, "loodgieter nabij" intikken en scrollen door Google Maps. Als jij daar niet tussenstaat, ziet die klant je concurrent wél. Zo simpel kan het zijn.',
    date: 'JAN 2026',
    featuredImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop&q=80', // Business person using smartphone
    sections: [
      {
        type: 'paragraph',
        content: 'Stel je voor: iemand in jouw buurt heeft dringend een loodgieter, kapper of webdesigner nodig. Wat doet die persoon? Juist, smartphone bovenhalen, "loodgieter nabij" intikken en scrollen door Google Maps. Als jij daar niet tussenstaat, ziet die klant je concurrent wél. Zo simpel kan het zijn.'
      },
      {
        type: 'heading',
        content: 'Iedereen zoekt online',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Belgen leven online. Of het nu gaat om een snelle lunch bestellen of een nieuw huis laten bouwen, de zoektocht begint digitaal. Zonder site of Maps-profiel speel je verstoppertje met potentiële klanten die letterlijk om de hoek wonen.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop&q=80', // Google Maps on smartphone
        alt: 'Google Maps zoekresultaten voor lokale bedrijven'
      },
      {
        type: 'heading',
        content: 'Het voelt gewoon vertrouwd',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Een verzorgde website met echte foto\'s, reviews en contactinfo? Dat straalt betrouwbaarheid uit. Mensen denken: "Oké, deze zaak ziet er goed uit, ik bel ze." Online is king.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&q=80', // Person working on laptop with coffee
        alt: 'Tevreden klant aan laptop'
      },
      {
        type: 'heading',
        content: 'Leads vallen gewoon binnen',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Google Maps is goud voor lokale zaakvoerders. Mensen die "webshop laten bouwen Brussel" zoeken, zijn vaak al half overtuigd. Ze klikken, bellen of sturen bericht, en hop, afspraak in de agenda. Geen cold calls nodig, ze komen vanzelf.'
      },
      {
        type: 'heading',
        content: 'Groei zonder stress',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Optimaliseer SEO en je Maps-profiel en klanten stromen binnen zonder dat je elk jaar fortuinen aan ads spendeert. Het bouwt zich op: 1 enthousiaste klant deelt je link, de volgende vind je via google, en zo groeit je klantenbestand vanzelf.'
      }
    ],
    cta: {
      text: 'Laat me jouw online présence fixen – contacteer Studio Thielman vandaag nog!',
      link: '/contact'
    }
  }
]

// Filter function to get only visible blog posts
const getVisibleBlogPosts = (): BlogPost[] => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time to start of day for accurate comparison
  
  return blogPosts.filter(post => {
    if (!post.visibleFrom) {
      return true // No visibility restriction, always visible
    }
    
    const visibleFromDate = new Date(post.visibleFrom)
    visibleFromDate.setHours(0, 0, 0, 0)
    
    return today >= visibleFromDate
  })
}

// Export filtered blog posts
export const visibleBlogPosts = getVisibleBlogPosts()

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  // Only return if the post is visible
  return getVisibleBlogPosts().find(post => post.slug === slug)
}

export const getLatestBlogPost = (): BlogPost | undefined => {
  const visible = getVisibleBlogPosts()
  return visible.length > 0 ? visible[0] : undefined
}
