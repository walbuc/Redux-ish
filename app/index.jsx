import './styles/main.scss';
import dom, { renderDOM } from 'utils/dom';
import compose from 'utils/compose';
import { createStore } from './data/redux-ish';
import Slideshow from './components/Slideshow';
import Controls from './components/Controls';
import mainReducer from './data/reducers';
import middleware from './utils/action-history-middleware';
import slides from './data/slides';


// initialState :: Object
const initialState = {
  title: '',
  presentation: {
    slides: [],
    slidePos: [0, 0],
  },
  settings: {},
};

const {
  getState, dispatch, subscribe,
} = createStore(mainReducer, initialState, middleware);

/*
* Returns a function  that takes the new state object,
* to update the UI.
*/
const update = renderDOM((state) => {
  const {
    title,
    presentation: {
      slides, slidePos,
    },
    settings,
  } = state;
  return (
    <div>
      <h1 className="display-3 text-center">{ title }</h1>
      <Slideshow slides={slides} settings={settings} />
      <Controls {...state} dispatch={dispatch} />
    </div>
  );
}, document.getElementById('functionalApp'), getState());

// when dispatch is called
// update will be called with
// the new state returned by reducers
subscribe(() => {
  update(getState(), dispatch);
});

dispatch({ type: 'CUSTOM_TITLE', value: 'Functional App Presentation' });
dispatch({ type: 'SETUP_SLIDES', value: slides });
