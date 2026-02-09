import {Trans, useTranslation} from 'react-i18next';
import {StaticElement, HeaderElement, FormElement, SelectElement, DateElement, TextareaElement} from 'jsx/Form';
import {useState, useEffect} from 'react';

import hiStrings from '../locale/hi/LC_MESSAGES/media.json';
import jaStrings from '../locale/ja/LC_MESSAGES/media.json';
import frStrings from '../locale/fr/LC_MESSAGES/media.json';
import esStrings from '../locale/es/LC_MESSAGES/media.json';

type Candidate = {
	PSCID: string
	CandID: number
	Project: string
}

/**
 * Manages state and API calls around selecting a candidate's visit.
 *
 * Note: this should eventually moved out of this module and reused by
 * the imaging and electrophysiology uploaders.
 *
 */
function useCandidateSelector(BaseURL: string) {
    const {t} = useTranslation();

    const [candidates, setCandidates] = useState({});
    const [curCandidate, setCurCandidate] = useState('');

    const [curVisit, setCurVisit] = useState('');
    const [visits, setVisits] = useState({});

    useEffect( () => {
	    fetch(BaseURL + '/api/v0.0.3/candidates/')
	    .then( (response) => {
		    if(!response.ok) {
			    throw new Error();
		    }
		    return response.json();
	    }).then( (json) => {
		const obj: {[candid: number]: string} = {};
		json['Candidates'].forEach( (row: Candidate) => {
			obj[row['CandID']] = row['PSCID']
		});
	    	setCandidates(obj);
    });
    }, []);

    useEffect( () => {
	    setVisits({});
	    setCurVisit('');
	    if(curCandidate == '') {
		    return;
		}
	    fetch(BaseURL + '/api/v0.0.3/candidates/' + curCandidate)
	    .then( (response) => {
		    if(!response.ok) {
			    throw new Error();
		    }
		    return response.json();
	    }).then( (json) => {
		const obj: {[vl: string]: string} = {};
		json['Visits'].forEach( (visit: string) => {
			obj[visit] = visit;
		});
		setVisits(obj);
	    });
    }, [curCandidate]);

    return {
	    candidate: curCandidate,
	    visit: curVisit,

	    selectCandidate: <SelectElement
	      name="PSCID"
	      value={curCandidate}
	      sortByValue={true}
              required={true}
	      onUserInput={ (e: string, v: string) => setCurCandidate(v) }
	      label={t('PSCID', {ns: 'loris'})}
	      options={candidates}
	    />,

	    selectVisit: <SelectElement
	      name="Visit"
	      value={curVisit}
	      sortByValue={false}
              required={true}
	      onUserInput={ (e: string, v: string) => setCurVisit(v) }
	      label={t('Visit Label', {ns: 'loris'})}
	      disabled={curCandidate === ''}
	      options={visits}
	      />
    }

}


export function MediaUploadForm(props: {
	BaseURL: string,
	maxUploadSize: number
	startYear: number,
	endYear: number
	languages: {[language: string]: string}
}) {
    const {t} = useTranslation();

    const cand = useCandidateSelector(props.BaseURL)
    const [curInstrument, setCurInstrument] = useState('');
    const [instruments, setInstruments] = useState({});
    const [dateTaken, setDateTaken] = useState('');
    const [comments, setComments] = useState('');
    const [language, setLanguage] = useState('');
    useEffect( () => {
	    setInstruments({});
	    setCurInstrument('');
	    if(cand.candidate == '' || cand.visit == '') {
		    return;
		}
	    fetch(props.BaseURL + '/api/v0.0.3/candidates/' + cand.candidate + '/' + cand.visit + '/instruments')
	    .then( (response) => {
		    if(!response.ok) {
			    throw new Error();
		    }
		    return response.json();
	    }).then( (json) => {
		const obj: {[vl: string]: string} = {};
		json['Instruments'].forEach( (inst: string) => {
			obj[inst] = inst;
		});
		setInstruments(obj);
	    });
    }, [cand.candidate, cand.visit]);
    const prefix = '['
        + t('PSCID', {ns: 'loris'}) 
        + ']_[' 
        + t('Visit Label', {ns: 'loris'})
        + ']_['
        + t('Instrument', {ns: 'loris', count: 1})
        + ']';

    const helpText = (<span>
      <Trans
        i18nKey={'<p>File name must begin with <b>{{prefix}}</b>.</p>'
	   + '<p>For example, for candidate <i>ABC123</i>, visit <i>V1</i> and instrument <i>Body Mass Index</i> file name should be prefixed by <b>ABC123_V1_bmi</b>.</p>'
	   + '<p>File cannot exceed {{maxSize}}.</p>'}
        ns="media"
        values={{maxSize: props.maxUploadSize, prefix: prefix}}
        components={{b: <b/>, p: <p/>, i: <i/> }} />
      </span>);


    return (<div className='row'>
       <div className='col-md-8 col-lg-7'>
          <FormElement
            name='mediaUpload'
            fileUpload={true}
	    onSubmit={ () => { return false;} }
          >
            <HeaderElement
              text={t('Upload a media file', {ns: 'media'})}
            />
            <StaticElement
              label={t('Note', {ns: 'media'})}
              text={helpText}
            />
	    {cand.selectCandidate}
	    {cand.selectVisit}
	    <SelectElement
	      name="Instrument"
	      value={curInstrument}
	      sortByValue={false}
              required={false}
	      onUserInput={ (e: string, v: string) => setCurInstrument(v) }
	      label={t('Instrument', {ns: 'loris', count: 1})}
	      disabled={cand.candidate === '' || cand.visit === ''}
	      options={instruments}
	      />
            <DateElement
              name='dateTaken'
              label={t('Date of Administration', {ns: 'media'})}
              minYear={props.startYear}
              maxYear={props.endYear}
              onUserInput={(e: string, v: string) => { setDateTaken(v)}}
              value={dateTaken}
            />
            <TextareaElement
              name='comments'
              label={t('Comments', {ns: 'media'})}
              onUserInput={(e: string, v: string) => { setComments(v)}}
              value={comments}
            />
            <SelectElement
              name='language'
              label={t('Document\'s Language', {ns: 'media'})}
              options={props.languages}
	      sortByValue={false}
              onUserInput={(e: string, v: string) => { setLanguage(v)}}
              required={false}
              value={language}
            />
	  </FormElement>
	</div>
	</div>
   );
}

