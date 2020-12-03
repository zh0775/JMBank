import Vue from 'vue';
import VueStorage from 'vue-ls';
import { WebStorage } from 'vue-ls/src/storage/WebStorage';
import config from '@/config/defaultSetting';
import {
  Table,
  TableColumn,
  Button,
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  Input,
  Icon,
  Autocomplete,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Select,
  Option,
  Link,
  Message,
  DatePicker,
  Upload,
  Divider,
  Tooltip,
  Badge,
  Tree,
  Avatar,
  Dialog,
  Checkbox,
  Switch,
  TimePicker,
  RadioGroup,
  Radio,
  Popover,
  RadioButton
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 };
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Autocomplete);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Tooltip);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Tree);
Vue.use(Avatar);
Vue.use(Dialog);
Vue.use(Switch);
Vue.use(Checkbox);
Vue.use(TimePicker);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Popover);
Vue.use(RadioButton);
// Vue.use(HtmlPanel);
// Vue.use(ZTable);
// Vue.use(ZHeader);
// Vue.use(ZMenu);
// Vue.use(MailEdit);
// Vue.use(MailNotice);
// Vue.use(EmailOperation);
// Vue.use(ZDatePicker);
// Vue.use(MarkMail);

// ext library
Vue.use(VueStorage, config.storageOptions);
Vue.prototype.$message = Message;
/** vue-ls只能install一次，所以要想使用sessionStorage就只能将其放在Vue的原型链中 */
const ss = new WebStorage(window.sessionStorage);
ss.setOptions(config.sessionOptions);
ss.install = function (Vue, options) {
  Vue.ss = ss;
  Object.defineProperty(Vue.prototype, '$ss', {
    get () {
      return ss;
    }
  });
};
Vue.use(ss);
