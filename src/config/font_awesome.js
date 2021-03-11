import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTachometerAlt, faBoxes, faClipboardList, faUsers, faBars, faUser, faSignOutAlt, faPlus, faTools, faSort, faSortUp, faSortDown, faChevronLeft, faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTachometerAlt);
library.add(faBoxes);
library.add(faClipboardList);
library.add(faUsers);
library.add(faBars);
library.add(faUser);
library.add(faSignOutAlt);
library.add(faPlus);
library.add(faTools);
library.add(faSort);
library.add(faSortUp);
library.add(faSortDown);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);

export default FontAwesomeIcon;
