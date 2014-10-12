// ==UserScript==
// @name Mig[VK]Script
// @namespace http://vkontakte.ru/
// @description Полезные фичи для [в]контакте
// @author Mr_Mig
// @version 0.15.0
// @copyright 2009+, Mr_Mig (http://vkontakte.ru/id4518704)
// @license Beerware
// @include http://*vkontakte.ru/*
// @include http://*vk.com/*
// @include http://vk.hamlab.net/*
// @exclude http://vkontakte.ru/login*
// @exclude http://vk.com/login*
// @exclude http://login.vk.com/*
// @exclude http://vk.com/im*
// @exclude http://vkontakte.ru/im*
// ==/UserScript==

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42): <migfiziki@gmail.com> wrote this file.
 * As long as you retain this notice you can do whatever you want with this
 * stuff. If we meet some day, and you think this stuff is worth it, you can buy
 * me a beer in return. Mr_Mig
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42): <migfiziki@gmail.com> написал сей
 * скрипт. Вы можете использовать этот код как пожелаете и для любых целей при
 * условии, что вы сохраните эту заметку. Если мы когда-либо встретимся, и вы
 * считаете, что данный скрипт вам полезен, вы можете купить мне пиво, либо
 * выпить за мое здоровье. Mr_Mig
 * ----------------------------------------------------------------------------
 */

/*
 *    
 *   )  
 * 
 * П
 */

// СКРИПТ
var MigScript = {
	SCRIPT_VERSION : "0.15.0",
	HOST : "http://vk.com",
	CSS_HOST : "http://vk.hamlab.net",
	DEBUG : false,
	myUid : null,
	opera : /opera/.test(navigator.userAgent.toLowerCase()),
	purge : null,
	log : function(msg) {
		if (MigScript.DEBUG) {
			console.log(msg);
		}
	},
	alert : function(caption, msg, classPrefix) {
		if (MigScript.Settings.local_settings[14]) {
			if (classPrefix) {
				(new MigScript.CustomObjects.AlerterClass(classPrefix)).alert(
						caption, msg);
			} else {
				(new MigScript.CustomObjects.AlerterClass())
						.alert(caption, msg);
			}
		}
	},
	helloMsg : "<center><h1>Здравствуйте!</b></h1></center><br>"
			+ "<center>Версия <b>0.15.0</b></center><br><br>"
			+ "<br> "
			+ "<br> Приветствую вас, пользователи скрипта!"
			+ "<br> Для начала немного информации. Версия 0.16 скорее всего будет последней из нулевых."
			+ "<br> Поэтому к вам большая просьба - отнеситесь к тестированию 15 и 16 версий <b>серьезно</b>!"
			+ "<br> " 
			+ "<br> При установке новой версии, вероятно, <b>придется полностью очистить настройки</b>!"
			+ "<br> А также, вероятно, <b>отключить звуки</b>!"
			+ "<br>В версии 0.15.0 вы найдете:"
			+
			// "<br><br>Изменения:" +
			"<ul> "
			+ "<li> Контейнер \"Бывшие друзья\"</li>"
			+ "<li> Сбор статистики (<b>отсылка соглашения на мое предложение в контакте</b>)</li>"
			+ "<li> Поправлены некоторые элементы интерфейса (изменен дизайн по мелочи) </li>"
			+ "<li> Контейнер \"Сообщение\" при нажатии на \"отравить сообщение\" во всплывающем меню (отправка по Ctrl+Enter) </li>"
			+ "<li> Контейнер \"Мгновенные сообщения\" при нажатии на \"отправить сообщение IM\" во всплывающем меню </li>"
			+ "<li> Настройка открытия \"мгновенных сообщений\" и \"отправки сообщения\" в контейнере/новой вкладке</li>"
			+ "<li> Исправлено добавление в друзья через всплывающее меню </li>"
			+ "<li> <b>Настройка \"Уведомлять при выходе только избранных друзей в сеть\" </b></li>"
			+ "<li> Поправлены отметки всех на фото-видео (<b>максимум 35 человек </b>), удаление ометок (капча)</li>"
			+ "<li> Кнопка \"ТХТ\" - ссылка на текст песен с lyricsplugin</li>"
			+ "<li> Доработан механизм обновлений</li>"
			+ "<li> Поправлен бан пользователей через всплывающее меню </li>"
			+ "<li> Приглашение всех друзей в группу (тестовый режим) </li>"
			+ "</ul>"
			+ ""
			
			+ "<br><br> Новая версия = новые баги. Жду ваших замечаний и пожеланий!"
			+ "<br>"
			+ "<br><br><hr><b>Hint:</b> В нашей группе появился <a href='http://vkontakte.ru/pages.php?id=10553319'>F.A.Q</a>!"
			+ " Читайте!",
	registerGlobal : function() {
		unsafeWindow.MigScript = MigScript;
	},
	init : function() {
		MigScript.HOST = MigScript.Util.checkLocation("vk.com")
				? "http://vk.com"
				: "http://vkontakte.ru";
		MigScript.myUid = MigScript.myUid ? MigScript.myUid : MigScript.Util
				.getMyUid();
		MigScript.log(MigScript.myUid);
		// Извещение
		MigScript.UI.showHelloMsg();
		MigScript.purge = MigScript.Util.deserialize("purge", false);
		MigScript.log("purge: " + MigScript.purge);
		if (MigScript.purge) {
			MigScript.Settings.purgeSettings();
		}
		if (!MigScript.Util.checkLocation("vk.hamlab.net")) {

			// Переделываем меню
			MigScript.Ajax.init();
			MigScript.log("Ajax init");
			MigScript.Settings.init();
			MigScript.log("Settings init");
			MigScript.UI.MainMenu.resetMenu();

			MigScript.Watcher.init();
			MigScript.log("Watcher init");

			if (!MigScript.opera) {
				MigScript.Update.init();
				MigScript.log("Update init");
			}
			MigScript.Styler.init();
			MigScript.log("Styler init");
			MigScript.Friends.init();
			MigScript.log("Friends init");
			MigScript.ExFriends.init();
			MigScript.log("exFriends init");
			MigScript.Menu.init();
			MigScript.log("Menu init");
			MigScript.Sound.init();
			MigScript.log("Sound init");

			MigScript.Alerts.checkAlerts();
			MigScript.UI.createUI();
			MigScript.log("UI created");
			MigScript.UI.Menu.init();
			// MigScript.UI.MultiPanel.init();
			MigScript.OnlineFriends.init();
			MigScript.log("OF init");
			MigScript.WhoFaved.init();
			MigScript.log("Who faved init");
			MigScript.FavContainer.init();
			MigScript.log("Containers init");
		} else {
			MigScript.Styler.prepareUI();
		}

		// MigScript.Invisibility.setInvisible();
	}
};

MigScript.Settings = {
	loadSettings : function() {

		return [{
					n : 2,
					id : "version",
					text : "Версия скрипта (кликни, чтобы обновить ->)",
					type : "alink",
					value : MigScript.Settings.local_settings[0],
					title : "Проверить наличие новой версии",
					action : MigScript.Update.forceUpd,
					condition : MigScript.Update.updReady,
					defaultValue : "0.0.0"
				}, {
					n : 23,
					id : "config_msg_add",
					text : "Добавить всплывающее меню каждому контакту",
					type : "checkbox",
					value : MigScript.Settings.local_settings[1]
				}, {
					n : 11,
					id : "config_fr_watch",
					text : "Включить модуль \"Бывшие друзья\"",
					type : "checkbox",
					value : MigScript.Settings.local_settings[2]
				}, {
					n : 71,
					id : "config_fr_timer",
					text : "Проверять список бывших друзей каждые Х минут",
					type : "input",
					value : MigScript.Settings.local_settings[3]
				}, {
					n : 15,
					id : "config_refresh_timer",
					text : "Задержка выпадения меню, мс",
					type : "input",
					value : MigScript.Settings.local_settings[4]
				}, {
					n : 31,
					id : "config_newmsg_bgcolor",
					text : "Цвет фона нового сообщения",
					type : "input",
					value : MigScript.Settings.local_settings[5]
				}, {
					n : 32,
					id : "config_newmsg_color",
					text : "Цвет текста нового сообщения",
					type : "input",
					value : MigScript.Settings.local_settings[6]
				}, {
					n : 33,
					id : "config_use_userstyle",
					text : "Использовать свой стиль",
					type : "checkbox",
					value : MigScript.Settings.local_settings[7]
				}, {
					n : 35,
					id : "config_userstyle",
					text : "Ваш стиль",
					type : "area",
					value : MigScript.Settings.local_settings[8]
				}, {
					n : 3,
					id : "config_upd_time",
					text : "Проверять обновление скрипта каждые Х минут",
					type : "input",
					value : MigScript.Settings.local_settings[9]
				}, {
					n : 19,
					id : "config_gsearch_vdownlinks",
					text : "Создавать ссылки на скачивание видео при поиске (кушает трафик)",
					type : "checkbox",
					value : MigScript.Settings.local_settings[10]
				}, {
					n : 34,
					id : "config_css_select",
					text : "Выбранный скин (нажми, чтобы изменить)",
					type : "alink",
					value : MigScript.Settings.local_settings[11],
					title : "Выбрать другой скин",
					defaultValue : "Стандартный",
					action : MigScript.Styler.showSkinSelector,
					condition : function() {
						return true;
					}
				}, {
					n : 12,
					id : "config_onl_check",
					text : "Включить модуль \"Список друзей онлайн\"",
					type : "checkbox",
					value : MigScript.Settings.local_settings[12]
				}, {
					n : 72,
					id : "config_onl_period",
					text : "Обновлять онлайн-список каждые Х секунд",
					type : "input",
					value : MigScript.Settings.local_settings[13]
				}, {
					n : 41,
					id : "config_alert_show",
					text : "Включить всплывающие оповещения",
					type : "checkbox",
					value : MigScript.Settings.local_settings[14]
				}, {
					n : 62,
					id : "config_sound_play",
					text : "Проигрывать звуки",
					type : "checkbox",
					value : MigScript.Settings.local_settings[15]
				}, {
					n : 32,
					id : "config_alert_rem",
					text : "Оповещения исчезают через Х секунд",
					type : "input",
					value : MigScript.Settings.local_settings[16]
				}, {
					n : 42,
					id : "config_alert_show_msg",
					text : "Оповещать о новых сообщениях",
					type : "checkbox",
					value : MigScript.Settings.local_settings[17]
				}, {
					n : 43,
					id : "config_alert_show_online",
					text : "Оповещать о выходе друзей в сеть",
					type : "checkbox",
					value : MigScript.Settings.local_settings[18]
				}, {
					n : 13,
					id : "config_menu_reset",
					text : "Включить новый вид главного меню (выпадающие ссылки)",
					type : "checkbox",
					value : MigScript.Settings.local_settings[19]
				}, {
					n : 73,
					id : "config_watcher_period",
					text : "Проверять обновления сообщений, отметок и т.д. каждые Х секунд",
					type : "input",
					value : MigScript.Settings.local_settings[20]
				}, {
					n : 16,
					id : "config_mainmenu_btn",
					text : "Плавающее главное меню (можно отцепить)",
					type : "checkbox",
					value : MigScript.Settings.local_settings[21]
				}, {
					n : 35,
					id : "config_mainmenu_spanpage",
					text : "При отцепливании главного меню страница расширяется",
					type : "checkbox",
					value : MigScript.Settings.local_settings[22]
				}, {
					n : 46,
					id : "config_alert_show_fr",
					text : "Оповещать о заявках на дружбу",
					type : "checkbox",
					value : MigScript.Settings.local_settings[23]
				}, {
					n : 47,
					id : "config_alert_show_photos",
					text : "Оповещать об отметках на фото",
					type : "checkbox",
					value : MigScript.Settings.local_settings[24]
				}, {
					n : 48,
					id : "config_alert_show_videos",
					text : "Оповещать об отметках на видео",
					type : "checkbox",
					value : MigScript.Settings.local_settings[25]
				}, {
					n : 49,
					id : "config_alert_show_notes",
					text : "Оповещать о новых комментариях к заметкам",
					type : "checkbox",
					value : MigScript.Settings.local_settings[26]
				}, {
					n : 50,
					id : "config_alert_show_groups",
					text : "Оповещать о приглашениях в группы",
					type : "checkbox",
					value : MigScript.Settings.local_settings[27]
				}, {
					n : 51,
					id : "config_alert_show_events",
					text : "Оповещать о приглашениях на мероприятия",
					type : "checkbox",
					value : MigScript.Settings.local_settings[28]
				}, {
					n : 63,
					id : "config_sound_online",
					text : "Звук при выходе друзей онлайн",
					type : "checkbox",
					value : MigScript.Settings.local_settings[29]
				}, {
					n : 64,
					id : "config_sound_message",
					text : "Звук при получении нового сообщения",
					type : "checkbox",
					value : MigScript.Settings.local_settings[30]
				}, {
					n : 65,
					id : "config_sound_new items",
					text : "Звук при обновлении фото, видео, заметок и т.д.",
					type : "checkbox",
					value : MigScript.Settings.local_settings[31]
				}, {
					n : 14,
					id : "config_mainmenu_cascadeRight",
					text : "Главное меню раскрывается вправо",
					type : "checkbox",
					value : MigScript.Settings.local_settings[32]
				}, {
					n : 24,
					id : "config_whofaved",
					text : "Включить модуль \"Кто добавил в закладки\"",
					type : "checkbox",
					value : MigScript.Settings.local_settings[33]
				}, {
					n : 18,
					id : "config_vdownlinks",
					text : "Добавлять ссылки на скачивание видео",
					type : "checkbox",
					value : MigScript.Settings.local_settings[34]
				}, {
					n : 20,
					id : "config_adownlinks",
					text : "Добавлять ссылки на скачивание аудио",
					type : "checkbox",
					value : MigScript.Settings.local_settings[35]
				}, {
					n : 21,
					id : "config_audio_dublicates",
					text : "Удалять дубликаты при поиске аудио",
					type : "checkbox",
					value : MigScript.Settings.local_settings[36]
				}, {
					n : 16,
					id : "config_stripmenu",
					text : "Убирать префиксы в меню",
					type : "checkbox",
					value : MigScript.Settings.local_settings[37]
				}, {
					n : 17,
					id : "config_stripmenu_mask",
					text : "Удалять следующие префиксы",
					type : "input",
					value : MigScript.Settings.local_settings[38]
				}, {
					n : 26,
					id : "config_animation",
					text : "Анимация и эффекты",
					type : "checkbox",
					value : MigScript.Settings.local_settings[39]
				}, {
					n : 44,
					id : "config_sound_fav_online",
					text : "Оповещать только о выходе избранных друзей в сеть",
					type : "checkbox",
					value : MigScript.Settings.local_settings[40]
				}, {
					n : 25,
					id : "config_wrap_messages",
					text : "Включить отправку сообщений через всплывающие контейнеры",
					type : "checkbox",
					value : MigScript.Settings.local_settings[41]
				}, {
					n : 22,
					id : "config_lyrics",
					text : "Добавлять ссылки на текст песен с lyricsplugin",
					type : "checkbox",
					value : MigScript.Settings.local_settings[42]
				},
				// {
				// n : 27,
				// id : "config_eye",
				// text : "Подглядывать за <b>чужими скинами</b>. (Только на
				// странице профиля)",
				// type : "checkbox",
				// value : MigScript.Settings.local_settings[43]
				// },

				// Должно быть в самом низу
				{
					n : 61,
					id : "config_sound_infolabel",
					text : "Для проигрывания звуков нужен отдельный файл Mig[vk]Sound",
					type : "alink",
					value : "Установить звуки",
					title : "Установить скрипт Mig[vk]Sound",
					defaultValue : "Установить звуки",
					action : function() {
						window.location = "http://userscripts.org/scripts/source/64840.user.js";
					},
					condition : function() {
						return true;
					}
				},

				{
					n : 1,
					label : "Автообновление",
					type : "section"
				}, {
					n : 10,
					label : "Модули",
					type : "section"
				}, {
					n : 30,
					label : "Стили и скины",
					type : "section"
				}, {
					n : 40,
					label : "Оповещения",
					type : "section"
				}, {
					n : 60,
					label : "Звуки",
					type : "section"
				}, {
					n : 70,
					label : "Управление запросами",
					type : "section"
				}

		];
	},
	getDefaultSettings : function() {// 1 //10 //20 //30 //35
		return [MigScript.SCRIPT_VERSION, true, true, 30, 300, "#eeee00",
				"navy", true, MigScript.Styler.getDefaultStyle(), 60, false,
				"Стандартный", true, 30, true, true, 5, true, true, true, 5,
				true, true, true, true, true, true, true, true, true, true,
				true, true, true, true, true, true, true, "Мои|Мое", true,
				false, true, true];
	},
	local_settings : null,
	default_settings : null,
	settings : null,
	getSortedSettings : function() {
		var ss = [];
		for (var i = 0; i < MigScript.Settings.settings.length; i++) {
			ss.push(MigScript.Settings.settings[i]);
			// MigScript.log(ss[i]);
		}
		return ss.sort(MigScript.Util.sNum);
	},
	saveSettings : function() {

		for (var i = 1; i < MigScript.Settings.settings.length; i++) {
			var value = null;
			try {
				value = eval(MigScript.DomUtil
						.ge(MigScript.Settings.settings[i].id)
						.getAttribute("value"));
			} catch (e) {
				try {
					value = MigScript.DomUtil
							.ge(MigScript.Settings.settings[i].id)
							.getAttribute("value");
				} catch (e1) {
				}
			}
			try {

				if (value == null) {
					if (MigScript.DomUtil.ge(MigScript.Settings.settings[i].id).value != null) {
						value = MigScript.DomUtil
								.ge(MigScript.Settings.settings[i].id).value;
					}
				}
				MigScript.Settings.local_settings[i] = value;
			} catch (e2) {

			}
		}
		var ls = MigScript.Settings.local_settings;
		MigScript.Util.serialize("local_settings", ls);
		window.location.reload();
	},
	resetSettings : function() {
		MigScript.Util.serialize("local_settings", MigScript.Settings
						.getDefaultSettings());
		MigScript.Util.serialize("updRejected", false);
		MigScript.Util.serialize("newVer", MigScript.SCRIPT_VERSION);
		MigScript.Util.serialize("updTime", 0);
		window.location.reload();
	},
	purgeSettings : function() {
		if (confirm("Все настройки скрипта будут удалены ПОЛНОСТЬЮ! Вы точно уверены, что этого хотите ??")) {
			MigScript.Util.serialize("local_settings", null);
			MigScript.Util.serialize("favFriendsList", null);
			MigScript.Util.serialize("exFriends", null);
			MigScript.Util.serialize("lastList", null);
			MigScript.Util.serialize("last_checked", null);
			MigScript.Util.serialize("olFloat", null);
			MigScript.Util.serialize("olFloat_x", null);
			MigScript.Util.serialize("olFloat_H", null);
			MigScript.Util.serialize("olFloat_W", null);
			MigScript.Util.serialize("olFloat_y", null);
			MigScript.Util.serialize("olFloat_fix", null);
			MigScript.Util.serialize("olFloat_roll", null);

			MigScript.Util.serialize("mainMenu", null);
			MigScript.Util.serialize("mainMenu_x", null);
			MigScript.Util.serialize("mainMenu_H", null);
			MigScript.Util.serialize("mainMenu_W", null);
			MigScript.Util.serialize("mainMenu_y", null);
			MigScript.Util.serialize("mainMenu_fix", null);
			MigScript.Util.serialize("mainMenu_roll", null);

			MigScript.Util.serialize("favGroups", null);
			MigScript.Util.serialize("favGroups_x", null);
			MigScript.Util.serialize("favGroups_H", null);
			MigScript.Util.serialize("favGroups_W", null);
			MigScript.Util.serialize("favGroups_y", null);
			MigScript.Util.serialize("favGroups_fix", null);
			MigScript.Util.serialize("favGroups_roll", null);

			MigScript.Util.serialize("favFriends", null);
			MigScript.Util.serialize("favFriends_x", null);
			MigScript.Util.serialize("favFriends_H", null);
			MigScript.Util.serialize("favFriends_W", null);
			MigScript.Util.serialize("favFriends_y", null);
			MigScript.Util.serialize("favFriends_fix", null);
			MigScript.Util.serialize("favFriends_roll", null);

			MigScript.Util.serialize("favedList", null);
			MigScript.Util.serialize("favedList_x", null);
			MigScript.Util.serialize("favedList_H", null);
			MigScript.Util.serialize("favedList_W", null);
			MigScript.Util.serialize("favedList_y", null);
			MigScript.Util.serialize("favedList_fix", null);
			MigScript.Util.serialize("favedList_roll", null);

			MigScript.Util.serialize("onlFriends", null);
			MigScript.Util.serialize("onlUpdTime", null);
			MigScript.Util.serialize("updTime", null);
			MigScript.Util.serialize("newVer", null);
			MigScript.Util.serialize("updRejected", null);
			MigScript.Util.serialize("hello", null);
			MigScript.Util.serialize("alerts", null);
			MigScript.Util.serialize("notifiedPool", null);

			MigScript.Util.serialize("purge", false);
			window.location.reload();
		}
	},
	init : function() {
		MigScript.myUid = MigScript.Util.getMyUid();
		MigScript.Settings.local_settings = MigScript.Util
				.deserialize("local_settings");
		// MigScript.log(MigScript.Settings.local_settings );
		MigScript.Settings.default_settings = MigScript.Settings
				.getDefaultSettings();
		MigScript.Settings.local_settings = MigScript.Settings.local_settings
				? MigScript.Settings.local_settings
				: [];
		// Добавляем в сохраненные настройки то, что отсутствовало в предыдущей
		// версии...
		if (MigScript.Settings.local_settings.length < MigScript.Settings.default_settings.length) {
			for (var i = MigScript.Settings.local_settings.length; i < MigScript.Settings.default_settings.length; i++) {
				MigScript.Settings.local_settings
						.push(MigScript.Settings.default_settings[i]);
			}
		}

		// Устанавливаем текущую версию
		if (MigScript.Settings.local_settings[0] != MigScript.SCRIPT_VERSION) {
			MigScript.Settings.local_settings[0] = MigScript.SCRIPT_VERSION;
		}
		MigScript.Settings.settings = MigScript.Settings.loadSettings();
		MigScript.Settings.tsettings = MigScript.Settings.getSortedSettings();
	}
};

MigScript.Ajax = {
	captchaBox : null,
	AjaxClass : function(onDone, onFail, eval_res) {
		var _t = this;
		this.onDone = onDone;
		this.onFail = onFail;
		var tran = null;
		var calls = 0;
		try {
			tran = new XMLHttpRequest();
		} catch (e) {
			tran = null;
		}
		try {
			if (!tran) {
				tran = new ActiveXObject("Msxml2.XMLHTTP");
			}
		} catch (e1) {
			tran = null;
		}
		try {
			if (!tran) {
				tran = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} catch (e2) {
			tran = null;
		}

		var parseRes = function() {
			if (!tran || !tran.responseText) {
				return;
			}
			var res = tran.responseText.replace(/^[\s\n]+/g, '');

			if (res.substr(0, 10) == "<noscript>") {
				try {
					var arr = res.substr(10).split("</noscript>");
					eval(arr[0]);
					tran.responseText = arr[1];
				} catch (e) {
				}
			} else {
			}
		};
		this.get = function(u, q, f) {
			f = f || false;
			if (typeof(q) != 'string') {
				q = MigScript.Ajax.ajx2q(q);
			}
			u = u + (q ? ('?' + q) : '');
			tran.open('GET', u, !f);
			if (calls) {
				tran.onreadystatechange = function() {
					stateDisp();
				};
			}
			tran.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			tran.send('');
			calls++;
		};
		this.post = function(u, d, f) {
			f = f || false;
			if (typeof(d) != 'string') {
				d = MigScript.Ajax.ajx2q(d);
			}
			tran.open('POST', u, !f);
			if (calls) {
				tran.onreadystatechange = function() {
					stateDisp();
				};
			}
			tran.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded");
			tran.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			tran.send(d);
			calls++;
		};

		this.postWithCaptcha = function(url, data, options) {
			var onSuccess, onFail, onCaptchaShow, onCaptchaHide, difficulty;
			if (!options)
				options = {};
			if (options) {
				onSuccess = options.onSuccess;
				onFail = options.onFail;
				onCaptchaShow = options.onCaptchaShow;
				onCaptchaHide = options.onCaptchaHide;
			}
			difficulty = options.difficultCaptcha ? '' : 's=1&';

			var _onDone = function(ajaxObj, responseText) {
				var response
				try {
					try {
						response = eval("(" + responseText + ")");
					} catch (e1) {

					};

					if (response && response.ok && response.ok == -2) {
						if (MigScript.Ajax.captchaBox == null) {

							var x = document.documentElement.clientWidth / 2
									- 120;
							var y = 200;
							MigScript.Ajax.captchaBox = new MigScript.CustomObjects.FloaterClass(
									x, y, "captcha", "Капча", {
										minHeight : 110
									});

							MigScript.Ajax.captchaBox.body.style.backgroundColor = "white";
							MigScript.Ajax.captchaBox.txt.style.backgroundColor = "white";
							MigScript.Ajax.captchaBox.txt.innerHTML = "Введите число";
							MigScript.Ajax.captchaBox.wrapCont.style
									.setProperty("z-index", "3000", "important");

						} else {
							MigScript.DomUtil
									.show(MigScript.Ajax.captchaBox.wrapCont);
						}
						if (response.difficult) {
							difficulty = response.difficult ? '' : 's=1&';
						}
						var box = MigScript.Ajax.captchaBox.body;

						var key;

						MigScript.DomUtil.removeChildNodes(box);
						var img = MigScript.DomUtil.dc("img");
						img.src = MigScript.HOST + '/captcha.php?' + difficulty
								+ 'sid=' + response.captcha_sid;
						box.appendChild(img);

						box.appendChild(MigScript.DomUtil.dc("br"));

						var inp = MigScript.DomUtil.dc("input");
						inp.type = "text";
						inp.id = "captchaKey";
						box.appendChild(inp);
						inp.addEventListener("keypress", function(e) {
							if (((e.keyCode == 0xA) || (e.keyCode == 0xD))
									|| ((e.ctrlKey) && ((e.keyCode == 0xA) || (e.keyCode == 0xD)))) {
								if (typeof(data) == 'object') {
									MigScript.Util.extend(data, {
												'captcha_sid' : response.captcha_sid,
												'captcha_key' : MigScript.DomUtil
														.ge('captchaKey').value
											});
								} else {
									data += '&captcha_sid='
											+ response.captcha_sid
											+ '&captcha_key='
											+ MigScript.DomUtil
													.ge('captchaKey').value;
								}
								_t.onDone = _onDone;
								_t.onFail = onFail;
								_t.post(url, data);
								MigScript.Ajax.captchaBox.close();
							}
						}, true);

						if (onCaptchaShow) {
							onCaptchaShow();
						}
						key = MigScript.DomUtil.ge('captchaKey');
						key.focus();
					} else {
						throw "Exit";
					}
				} catch (e) { // if captcha test passed
					if (options.json && response) {
						responseText = response;
					} else if (response && typeof(response.text) == 'string') {
						responseText = response.text;
					}
					if (MigScript.Ajax.captchaBox) {
						MigScript.Ajax.captchaBox.close();
						if (onCaptchaHide) {
							onCaptchaHide(true);
						}
					}
					if (onSuccess) {
						onSuccess(ajaxObj, responseText);
					}
				}
			};
			// console.log(p.url + p.query);
			this.onDone = _onDone;
			this.onFail = onFail;
			this.post(url, data);
		};

		var stateDisp = function() {
			if (tran.readyState == 4) {
				if (tran.status >= 200 && tran.status < 300) {
					if (eval_res) {
						parseRes();
					}
					if (_t.onDone) {
						_t.onDone(_t, tran.responseText);
					}
				} else {
					if (_t.onFail) {
						_t.onFail(_t, tran.responseText);
					}
				}
			}
		};
		tran.onreadystatechange = stateDisp;
	},
	ajx2q : function(qa) {
		var query = [];

		for (var key in qa) {
			if (qa[key] == undefined || qa[key] == null
					|| typeof(qa[key]) == 'function') {
				continue;
			}
			query.push(encodeURIComponent(key) + '='
					+ encodeURIComponent(qa[key]));
		}
		return query.join('&');
	},
	ajax : null,
	init : function() {
		MigScript.Ajax.ajax = new MigScript.Ajax.AjaxClass(function() {
				}, function() {
					MigScript.log("ajax error");
				});
	}
};

MigScript.Update = {
	UpdaterClass : function(updTime) {
		var _t = this;
		var url = 'http://migvkscript.googlecode.com/svn/ver/version.txt';
		var randSeed = Math.floor(1 + (9999) * Math.random());

		this.init = function() {
			if (MigScript.Util.checkPeriod("updTime", updTime)) {
				MigScript.log("update check");
				this.check();
			}
		};

		this.check = function() {
			// console.log(randSeed);
			randSeed = Math.floor(1 + (9999) * Math.random());
			MigScript.log("update url: " + url + "?seed=" + randSeed);
			GM_xmlhttpRequest({
						method : "GET",
						url : url + "?seed=" + randSeed,
						onreadystatechange : this.update
					});
			MigScript.log("ask for update");
		};

		this.update = function(o) {
			if (o.readyState == 4) {
				var checkver = o.responseText;
				vnum = checkver;
				checkver = checkver.split('.');

				var thisver = MigScript.SCRIPT_VERSION.split('.');
				var flag = false;
				checkver = parseInt(checkver[0] * 10000, 10)
						+ parseInt(checkver[1] * 100, 10)
						+ parseInt(checkver[2], 10);
				thisver = parseInt(thisver[0] * 10000, 10)
						+ parseInt(thisver[1] * 100, 10)
						+ parseInt(thisver[2], 10);
				MigScript.log("update processed");
				MigScript.log("v:" + thisver + " u:" + checkver);

				if (checkver - thisver > 0) {
					flag = true;
					MigScript.Util.serialize("newVer", vnum);
				}
				var isRej = MigScript.Util.deserialize("updRejected", false);
				if (flag && !isRej) {
					// MigScript.log("prompt");
					if (confirm("Новое обновление Mig[vk]Script v " + vnum
							+ " есть в наличии. Обновить скрипт??")) {
						_t.install();
					} else {
						MigScript.Util.serialize("updRejected", true);
					}
				}

			}
		};

		this.install = function() {
			MigScript.Util.serialize("updRejected", false);
			MigScript.Util.serialize("hello", false);
			window.location = 'http://userscripts.org/scripts/source/' + S_ID
					+ '.user.js';

		};

		this.init();
	},
	updater : null,
	forceUpd : function() {
		MigScript.Util.serialize("updRejected", false);
		MigScript.Update.updater.check();
	},

	forceInst : function() {
		var isRej = MigScript.Util.deserialize("updRejected", false);
		if (!isRej) {
			MigScript.Update.updater.check();
		} else {
			MigScript.Update.updater.install();
		}

	},
	updReady : function() {
		var v = MigScript.Util.deserialize("newVer", 0);
		var rej = MigScript.Util.deserialize("updRejected", false);
		if (rej) {
			var im = MigScript.DomUtil.dc("img");
			im.src = MigScript.UI.Images.warningImg();
			im.id = "warn_upd";
			im.title = "Имеется новая v " + v + " версия скрипта!";
			im.width = "20";
			im.style.marginRight = "10px";
			im.style.marginBottom = "-5px";
			im.style.cursor = "pointer";
			im.addEventListener("click", function() {
						MigScript.Update.forceInst();
					}, true);
			MigScript.DomUtil.ge("version").parentNode.insertBefore(im,
					MigScript.DomUtil.ge("version"));
		}
	},
	init : function() {
		MigScript.Update.updater = new MigScript.Update.UpdaterClass(MigScript.Settings.local_settings[9]
				* 1000 * 60);
		setTimeout(function() {
					MigScript.Update.updater.check();
				}, MigScript.Settings.local_settings[9] * 1000 * 60);
	}
};

MigScript.CustomObjects = {
	floaters : [],
	serializableAlerters : [],
	alerters : [],
	CheckboxClass : function(_id, _value) {
		this.body = MigScript.DomUtil.dc("img");
		this.body.id = _id;
		this.body.style.cursor = "pointer";
		this.body.value = eval(_value);
		var _v = uneval(_value);
		this.body.setAttribute("value", _v);
		if (!this.body.value) {
			this.body.src = MigScript.UI.Images.uncheckedImg();
		} else if (this.body.value) {
			this.body.src = MigScript.UI.Images.checkedImg();
		}
		this.body.addEventListener("click", function() {
					toggleChk(this.id);
				}, true);
		var toggleChk = function(id) {
			var img = MigScript.DomUtil.ge(id);
			var value = eval(img.getAttribute("value"));
			value = !value;

			img.setAttribute("value", uneval(value));
			if (!value) {
				img.src = MigScript.UI.Images.uncheckedImg();
			} else if (value) {
				img.src = MigScript.UI.Images.checkedImg();
			}
		};
	},
	Dragable : function(element, handleElement, startCallback, stopCallback,
			dragCallback, bound) {
		if (typeof(element) == "string") {
			element = document.getElementById(element);
		}
		if (element == null) {
			return;
		}

		bound = bound || {};
		if (bound.canMove == null) {
			bound.canMove = true;
		}

		if (typeof(handleElement) == "string") {
			handleElement = document.getElementById(handleElement);
		}
		if (handleElement == null) {
			handleElement = element;
		}

		this.ox = 0;
		this.oy = 0;

		this.isDrag = false;
		var _t = this;

		this.startDrag = function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			if (e.preventDefault) {
				e.preventDefault();
			}
			e.cancelBubble = true;
			e.cancel = true;
			e.returnValue = false;

			_t.isDrag = true;
			_t.ox = e.pageX;
			_t.oy = e.pageY;
			// document.body.setAttribute("style", "-moz-user-select:none;");
			if (startCallback) {
				startCallback();
			}
			// MigScript.log("fl " + this.id + " dragstart");
		};

		this.stopDrag = function(e) {
			if (_t.isDrag) {
				_t.isDrag = false;
				if (stopCallback) {
					stopCallback();
				}
			}
		};

		this.drag = function(e) {
			if (_t.isDrag) {
				if (e.stopPropagation) {
					e.stopPropagation();
				}
				if (e.preventDefault) {
					e.preventDefault();
				}
				e.cancelBubble = true;
				e.cancel = true;
				e.returnValue = false;

				var px = e.pageX - _t.ox;
				var py = e.pageY - _t.oy;
				_t.ox = e.pageX;
				_t.oy = e.pageY;
				if (bound.left && _t.ox < bound.left) {
					_t.ox = bound.left;
				}
				if (bound.right && _t.ox > bound.right) {
					_t.ox = bound.right;
				}
				if (bound.top && _t.oy < bound.top) {
					_t.oy = bound.top;
				}
				if (bound.bottom && _t.oy > bound.bottom) {
					_t.oy = bound.bottom;
				}
				if (bound.canMove) {
					element.style.left = element.offsetLeft + px + "px";
					element.style.top = element.offsetTop + py + "px";
				}

				if (dragCallback) {
					dragCallback(px, py);
				}

				// MigScript.log("fl " + this.id + " x:" + this.x + " y:" +
				// this.y);
			}
		};

		handleElement.addEventListener("mousedown", this.startDrag, false);
		handleElement.addEventListener("mouseup", this.stopDrag, false);
		document.addEventListener("mouseup", this.stopDrag, false);
		document.addEventListener("mousemove", this.drag, false);

	},
	Resizable : function(element, config) {
		if (typeof(element) == "string") {
			element = MigScript.DomUtil.ge(element);
		}
		if (element == null) {
			return;
		}
		config = config || {};

		var borderWidth = config.borderWidth || 4;
		var _width = config.width || config.minWidth || 10 * borderWidth;
		var _height = config.height || config.minHeight || 10 * borderWidth;

		var _t = this;
		if (config.bodyNode) {
			if (typeof(config.bodyNode) == "string") {
				config.bodyNode = document.getElementById(config.bodyNode);
			}
			this.body = config.bodyNode;
		} else {
			this.body = MigScript.DomUtil.dc("div");
			this.body.className = "resBody";
			element.parentNode.appendChild(this.body);
		}

		var nwHandle = MigScript.DomUtil.dc("div");
		nwHandle.className = "nwHandle";
		var moveXDirection = function(ox) {
			if (_width + ox > config.minWidth) {
				_width += ox;
			} else if (_width != config.minWidth) {
				ox = config.minWidth - (_width);
				_width = config.minWidth;
			} else {
				ox = 0;
			}
			return ox;
		};

		var moveYDirection = function(oy) {
			if (_height + oy > config.minHeight) {
				_height += oy;
			} else if (_height != config.minHeight) {
				oy = config.minHeight - (_height);
				_height = config.minHeight;
			} else {
				oy = 0;
			}
			return oy;
		};

		var nwResize = function(ox, oy) {
			ox = moveXDirection(-ox);
			oy = moveYDirection(-oy);
			_t.updatePosition(-ox, -oy);
		};

		new MigScript.CustomObjects.Dragable(nwHandle, null, null, null,
				nwResize, {
					canMove : false
				});

		var nHandle = MigScript.DomUtil.dc("div");
		nHandle.className = "nHandle handler";
		var nResize = function(ox, oy) {
			ox = 0;
			oy = moveYDirection(-oy);
			_t.updatePosition(ox, -oy);
		};
		new MigScript.CustomObjects.Dragable(nHandle, null, null, null,
				nResize, {
					canMove : false
				});

		var neHandle = MigScript.DomUtil.dc("div");
		neHandle.className = "neHandle handler";
		var neResize = function(ox, oy) {
			ox = moveXDirection(ox);
			oy = moveYDirection(-oy);
			_t.updatePosition(0, -oy);
		};
		new MigScript.CustomObjects.Dragable(neHandle, null, null, null,
				neResize, {
					canMove : false
				});

		var eHandle = MigScript.DomUtil.dc("div");
		eHandle.className = "eHandle handler";
		var eResize = function(ox, oy) {
			ox = moveXDirection(ox);
			oy = 0;
			_t.updatePosition(0, oy);
		};
		new MigScript.CustomObjects.Dragable(eHandle, null, null, null,
				eResize, {
					canMove : false
				});

		var seHandle = MigScript.DomUtil.dc("div");
		seHandle.className = "seHandle handler";
		var seResize = function(ox, oy) {
			ox = moveXDirection(ox);
			oy = moveYDirection(oy);
			_t.updatePosition(0, 0);
		};
		new MigScript.CustomObjects.Dragable(seHandle, null, null, null,
				seResize, {
					canMove : false
				});

		var sHandle = MigScript.DomUtil.dc("div");
		sHandle.className = "sHandle handler";
		var sResize = function(ox, oy) {
			oy = moveYDirection(oy);
			_t.updatePosition(0, 0);
		};
		new MigScript.CustomObjects.Dragable(sHandle, null, null, null,
				sResize, {
					canMove : false
				});

		var swHandle = MigScript.DomUtil.dc("div");
		swHandle.className = "swHandle handler";
		var swResize = function(ox, oy) {
			ox = moveXDirection(-ox);
			oy = moveYDirection(oy);
			_t.updatePosition(-ox, 0);
		};
		new MigScript.CustomObjects.Dragable(swHandle, null, null, null,
				swResize, {
					canMove : false
				});

		var wHandle = MigScript.DomUtil.dc("div");
		wHandle.className = "wHandle handler";
		var wResize = function(ox, oy) {
			ox = moveXDirection(-ox);
			oy = 0;
			_t.updatePosition(-ox, oy);
		};
		new MigScript.CustomObjects.Dragable(wHandle, null, null, null,
				wResize, {
					canMove : false
				});

		this.container = MigScript.DomUtil.dc("div");
		this.container.className = "resContainer";
		this.container.style.marginTop = borderWidth + "px";
		this.container.style.marginLeft = borderWidth + "px";

		if (!config.handles) {
			config.handles = "all";
		}

		if (/all/.test(config.handles) || /nw/.test(config.handles)) {
			this.body.appendChild(nwHandle);
		}
		if (/all/.test(config.handles) || /n/.test(config.handles)) {
			this.body.appendChild(nHandle);
		}
		if (/all/.test(config.handles) || /ne/.test(config.handles)) {
			this.body.appendChild(neHandle);
		}
		if (/all/.test(config.handles) || /w/.test(config.handles)) {
			this.body.appendChild(wHandle);
		}
		this.body.appendChild(this.container);
		if (/all/.test(config.handles) || /e/.test(config.handles)) {
			this.body.appendChild(eHandle);
		}
		if (/all/.test(config.handles) || /sw/.test(config.handles)) {
			this.body.appendChild(swHandle);
		}
		if (/all/.test(config.handles) || /s/.test(config.handles)) {
			this.body.appendChild(sHandle);
		}
		if (/all/.test(config.handles) || /se/.test(config.handles)) {
			this.body.appendChild(seHandle);
		}

		this.container.appendChild(element);

		this.updatePosition = function(ox, oy) {
			this.body.style.width = _width + 2 * borderWidth + "px";
			this.body.style.height = _height + 2 * borderWidth + "px";
			if (ox != 0) {
				_t.body.style.left = _t.body.offsetLeft + ox + "px";
			}
			if (oy != 0) {
				_t.body.style.top = _t.body.offsetTop + oy + "px";
			}

			nwHandle.style.width = borderWidth + "px";
			nwHandle.style.height = borderWidth + "px";

			nHandle.style.width = _width + "px";
			nHandle.style.height = borderWidth + "px";
			nHandle.style.left = borderWidth + "px";

			neHandle.style.width = borderWidth + "px";
			neHandle.style.height = borderWidth + "px";
			neHandle.style.left = borderWidth + _width + "px";

			eHandle.style.width = borderWidth + "px";
			eHandle.style.height = _height + "px";
			eHandle.style.left = borderWidth + _width + "px";
			eHandle.style.top = borderWidth + "px";

			sHandle.style.width = _width + "px";
			sHandle.style.height = borderWidth + "px";
			sHandle.style.left = borderWidth + "px";
			sHandle.style.top = borderWidth + _height + "px";

			seHandle.style.width = borderWidth + "px";
			seHandle.style.height = borderWidth + "px";
			seHandle.style.left = borderWidth + _width + "px";
			seHandle.style.top = borderWidth + _height + "px";

			swHandle.style.width = borderWidth + "px";
			swHandle.style.height = borderWidth + "px";
			swHandle.style.top = borderWidth + _height + "px";

			wHandle.style.width = borderWidth + "px";
			wHandle.style.height = _height + "px";
			wHandle.style.top = borderWidth + "px";

			if (config.onEndResize) {
				config.onEndResize(_width, _height);
			}
		};

		this.setHeight = function(height) {
			_height = height;
			this.updatePosition();
		};

		this.updatePosition();
	},
	FloaterClass : function(_x, _y, name, label, config) {
		this.name = name;
		this.label = label;
		var _t = this;
		this.rolled = MigScript.Util.deserialize(this.name + "_roll", true);

		var x = MigScript.Util.deserialize(this.name + "_x", _x);
		var y = MigScript.Util.deserialize(this.name + "_y", _y)
		config = config || {};

		config.height = MigScript.Util.deserialize(this.name + "_H",
				config.height);
		config.width = MigScript.Util.deserialize(this.name + "_W",
				config.width);

		this.fixed = MigScript.Util.deserialize(this.name + "_fix", true);
		this.isDrag = false;
		this.onClose = null;
		var _id = MigScript.CustomObjects.floaters.length;
		MigScript.CustomObjects.floaters.push(this);
		this.id = _id;
		// MigScript.log("new floater: " + _id);
		// MigScript.log(" floaters.length = " +
		// MigScript.CustomObjects.floaters.length);
		var onStartDrag = function() {
			MigScript.DomUtil.ge("fl_" + _t.id + "_head").style.cursor = "move";
		};

		var onStopDrag = function() {
			MigScript.DomUtil.ge("fl_" + _t.id + "_head").style.cursor = "default";
			// document.body.setAttribute("style", "-moz-user-select:text;");
			var el = MigScript.DomUtil.ge(_t.name);
			x = el.offsetLeft;
			y = el.offsetTop;
			MigScript.Util.serialize(_t.name + "_x", x);
			MigScript.Util.serialize(_t.name + "_y", y);

			// MigScript.log("fl " + this.id + " dragstop");
		};

		this.updateSize = function(width, height) {
			_t.body.style.width = width + "px";
			_t.body.style.height = height - _t.head.offsetHeight
					- _t.txt.offsetHeight + "px";
			_t.cont.style.width = width + "px";
			_t.cont.style.height = height + "px";
			MigScript.Util.serialize(_t.name + "_W", width);
			MigScript.Util.serialize(_t.name + "_H", height);
		};

		var resHandler = null;

		this.createUI = function() {

			this.wrapCont = MigScript.DomUtil.dc("div");
			this.wrapCont.className = "floater_cont";
			this.wrapCont.id = this.name;
			this.wrapCont.style.left = x + "px";
			this.wrapCont.style.top = y + "px";

			this.cont = MigScript.DomUtil.dc("div");
			this.cont.className = "floater_cont_inner";
			this.cont.style.width = config.width + "px";
			this.cont.style.height = config.height + "px";
			// this.cont.style.width = this.width + "px";

			document.body.appendChild(this.wrapCont);
			this.wrapCont.appendChild(this.cont);

			this.head = MigScript.DomUtil.dc("div");
			this.head.id = "fl_" + this.id + "_head";
			this.head.className = "floater_head";
			this.cont.appendChild(this.head);

			this.txt = MigScript.DomUtil.dc("div");
			this.txt.id = "fl_" + this.id + "_txt";
			this.txt.className = "floater_txt";
			this.cont.appendChild(this.txt);

			if (config.width < config.minWidth) {
				config.width = null;
			}

			if (config.height < config.minHeight) {
				config.height = null;
			}

			config.minWidth = config.minWidth || 125;
			config.minHeight = config.minHeight || this.head.offsetHeight
					+ this.txt.offsetHeight;

			this.body = MigScript.DomUtil.dc("div");
			this.body.id = "fl_" + this.id + "_body";
			this.body.className = "floater_body";
			this.body.style.overflow = "auto";
			this.body.style.height = config.minHeight - this.head.offsetHeight
					- this.txt.offsetHeight + "px";
			this.cont.appendChild(this.body);
			if (this.rolled) {
				this.body.style.display = "block";
			} else {
				this.body.style.display = "none";
			}
			// this.body.style.height = "300px";

			var labelcont = MigScript.DomUtil.dc("div");
			labelcont.style.display = "block";
			labelcont.id = "lc";
			this.head.addEventListener("mouseover", function(e) {
						MigScript.DomUtil.hide(MigScript.DomUtil
								.getDescendantById(_t.head, "lc"));
						MigScript.DomUtil.show(MigScript.DomUtil
								.getDescendantById(_t.head, "bc"));
					}, true);
			this.head.addEventListener("mouseout", function(e) {
						MigScript.DomUtil.hide(MigScript.DomUtil
								.getDescendantById(_t.head, "bc"));
						MigScript.DomUtil.show(MigScript.DomUtil
								.getDescendantById(_t.head, "lc"));
					}, true);

			var label = MigScript.DomUtil.dc("a");
			label.innerHTML = this.label;
			var blabel = MigScript.DomUtil.dc("b");

			var c = MigScript.DomUtil.dc("center");
			this.head.appendChild(labelcont);
			labelcont.appendChild(c);
			c.appendChild(blabel);
			blabel.appendChild(label);
			blabel.style.top = "3px";
			blabel.style.position = "relative";

			var btncont = MigScript.DomUtil.dc("div");
			btncont.style.display = "none";
			btncont.id = "bc";

			this.head.appendChild(btncont);

			var fxBtn = MigScript.DomUtil.dc("a");
			fxBtn.id = "fl_" + this.id + "_fx_btn";
			fxBtn.title = "Фиксировать";
			if (!this.fixed) {
				fxBtn.innerHTML = "<b>[f]</b>";
				this.wrapCont.style.setProperty("position", "absolute",
						"important");
			} else {
				fxBtn.innerHTML = "<font style='color:#f00!important;'><b>[f]</b></font>";
				this.wrapCont.style.setProperty("position", "fixed",
						"important");
			}
			fxBtn.style.cursor = "pointer";
			fxBtn.style.fontSize = "8pt";
			fxBtn.style.marginRight = "5px";
			fxBtn.style.marginTop = "2px";
			fxBtn.style.setProperty("float", "right", "");
			fxBtn.addEventListener("click", function(e) {
						MigScript.CustomObjects.floaters[_id].dofix(e);
					}, true);
			btncont.appendChild(fxBtn);

			var closeBtn = MigScript.DomUtil.dc("a");
			closeBtn.id = "fl_" + this.id + "_cls_btn";
			closeBtn.innerHTML = "<b>_</b>";
			closeBtn.title = "Закрыть";
			closeBtn.style.cursor = "pointer";
			closeBtn.style.fontSize = "8pt";
			closeBtn.style.marginRight = "5px";
			closeBtn.style.marginTop = "2px";
			closeBtn.style.setProperty("float", "right", "");
			closeBtn.addEventListener("click", function() {
						MigScript.CustomObjects.floaters[_id].close();
					}, true);
			btncont.appendChild(closeBtn);

			var rollBtn = MigScript.DomUtil.dc("a");
			rollBtn.id = "fl_" + this.id + "_roll_btn";
			if (this.rolled) {
				rollBtn.innerHTML = "[-]";
			} else {
				rollBtn.innerHTML = "[+]";
			}
			rollBtn.title = "Развернуть";
			rollBtn.style.cursor = "pointer";
			rollBtn.style.fontSize = "8pt";
			rollBtn.style.marginRight = "5px";
			rollBtn.style.marginTop = "2px";
			rollBtn.style.setProperty("float", "right", "");
			rollBtn.addEventListener("click", function() {
						MigScript.CustomObjects.floaters[_id].roll();
					}, true);
			btncont.appendChild(rollBtn);

			new MigScript.CustomObjects.Dragable(this.wrapCont, this.head,
					onStartDrag, onStopDrag);
			resHandler = new MigScript.CustomObjects.Resizable(this.cont, {
						handles : "all",
						minWidth : config.minWidth,
						width : config.width,
						height : config.height,
						minHeight : config.minHeight,
						onEndResize : _t.updateSize,
						bodyNode : _t.wrapCont
					});
			// MigScript.log("floater "+this.id + " UI created");
		};

		this.roll = function() {
			MigScript.UI.togglePlusBtn("fl_" + this.id + "_roll_btn");
			var height = this.head.offsetHeight + this.txt.offsetHeight;
			if (this.body.style.display == "none") {
				this.rolled = true;
				height = MigScript.Util.deserialize(this.name + "_oH", 0);
				resHandler.setHeight(height);
				this.body.style.setProperty("display", "block", "important");

			} else {
				this.rolled = false;
				MigScript.Util.serialize(this.name + "_oH", height
								+ this.body.offsetHeight);
				this.body.style.setProperty("display", "none", "important");
				resHandler.setHeight(height);
			}
			MigScript.Util.serialize(this.name + "_roll", this.rolled);
			// MigScript.log("fl " + this.id + " is rolled");
		};

		this.fix = function(e) {
			x -= window.scrollX;
			y -= window.scrollY;
			this.wrapCont.style.left = x + "px";
			this.wrapCont.style.top = y + "px";
			this.wrapCont.style.setProperty("position", "fixed", "important");
			var btn = MigScript.DomUtil.ge("fl_" + this.id + "_fx_btn");
			var _id = this.id;
			btn.innerHTML = "<font style='color:#f00!important;'><b>[f]</b></font>";
			MigScript.Util.serialize(this.name + "_fix", true);
			MigScript.Util.serialize(_t.name + "_x", x);
			MigScript.Util.serialize(_t.name + "_y", y);
		};
		this.unfix = function() {
			this.wrapCont.style
					.setProperty("position", "absolute", "important");
			var btn = MigScript.DomUtil.ge("fl_" + this.id + "_fx_btn");
			var _id = this.id;
			x += window.scrollX;
			y += window.scrollY;
			this.wrapCont.style.left = x + "px";
			this.wrapCont.style.top = y + "px";
			btn.innerHTML = "<b>[f]</b>";
			MigScript.Util.serialize(this.name + "_fix", false);
			MigScript.Util.serialize(_t.name + "_x", x);
			MigScript.Util.serialize(_t.name + "_y", y);
		};

		this.dofix = function(e) {
			if (MigScript.DomUtil.ge("fl_" + this.id + "_fx_btn").innerHTML == "<b>[f]</b>") {
				this.fix(e);
			} else {
				this.unfix();
			}
		};

		this.wakeUp = function(_x, _y) {
			MigScript.log("wake up " + _x + "_" + _y);
			x = _x;
			y = _y;
			if (x && y) {
				this.wrapCont.style.left = x;
				this.wrapCont.style.top = y;
			}
			this.wrapCont.style.setProperty("display", "block", "important");
		};

		this.close = function() {
			this.wrapCont.style.setProperty("display", "none", "important");
			MigScript.Util.serialize(this.name + "_x", x);
			MigScript.Util.serialize(this.name + "_y", y);
			MigScript.Util.serialize(this.name + "_fix", this.fixed);
			MigScript.Util.serialize(this.name + "_roll", this.rolled);
			if (this.onClose) {
				this.onClose();
			}
		};

		this.createUI();
	},
	AlerterClass : function(prefix) {
		var _t = this;
		this.id = -1;
		this.body = null;
		this.capt = null;
		this.cont = null;
		this.prefix = null;
		this.caption = "";
		this.text = "";

		this.isActive = false;

		var render = function() {
			var x = MigScript.Util.deserialize(_t.prefix + "posX",
					document.documentElement.clientWidth - _t.cont.offsetWidth);
			var y = MigScript.Util.deserialize(_t.prefix + "posY",
					document.documentElement.clientHeight
							- _t.cont.offsetHeight);
			_t.cont.style.left = x + "px";
			_t.cont.style.top = y + "px";
		};
		var push = function() {
			MigScript.CustomObjects.alerters.push(_t);
			_t.id = MigScript.CustomObjects.alerters.length;
		};
		var showNext = function() {
			var next = MigScript.CustomObjects.alerters[_t.id];
			if (next) {
				next.show();
			} else {
				MigScript.CustomObjects.alerters = [];
			}
		};

		var createUI = function() {

			_t.cont = MigScript.DomUtil.dc("div");
			_t.cont.className = _t.prefix + "alert_cont";
			_t.cont.id = "al_" + _t.id + "_cont";

			document.body.appendChild(_t.cont);

			var head = MigScript.DomUtil.dc("div");
			head.className = _t.prefix + "alert_head";
			head.id = "al_" + _t.id + "_head";
			new MigScript.CustomObjects.Dragable(_t.cont, null, null,
					onDragStop);
			_t.cont.addEventListener("dblclick", function(e) {
						e.stopPropagation();
						_t.close();
					}, false);

			var cl_link = MigScript.DomUtil.dc("a");
			cl_link.innerHTML = "<font color='red'>[x]</font>";
			cl_link.style.cursor = "pointer";
			// cl_link.style.marginRight = "20px";
			cl_link.addEventListener("click", function(e) {
						e.stopPropagation();
						_t.close();
					}, false);

			_t.capt = MigScript.DomUtil.dc("span");
			_t.capt.className = _t.prefix + "alert_capt";
			// this.capt.style.float = "left";
			_t.capt.style.overflow = "hidden";

			head.appendChild(_t.capt);
			head.appendChild(cl_link);

			_t.body = MigScript.DomUtil.dc("div");
			_t.body.id = "al_" + _t.id + "_body";
			_t.body.className = _t.prefix + "alert_body";
			_t.cont.appendChild(head);
			_t.cont.appendChild(_t.body);
		};

		var serialize = function() {
			var alerter = {
				'id' : _t.id,
				'text' : _t.text,
				'caption' : _t.caption,
				'prefix' : _t.prefix
			};
			if (MigScript.CustomObjects.serializableAlerters == null) {
				MigScript.CustomObjects.serializableAlerters = [];
			}
			MigScript.CustomObjects.serializableAlerters.push(alerter);
			MigScript.Util.serialize("alerts",
					MigScript.CustomObjects.serializableAlerters);
		};

		this.show = function() {
			createUI();
			this.isActive = true;
			clearTimeout(eval(_t.cont.getAttribute("timer")));
			this.capt.innerHTML = "<center><b>" + this.caption
					+ "</b></center>";
			this.body.innerHTML = "<center>" + this.text + "</center>";
			serialize();
			render();
			if (MigScript.Settings.local_settings[16] > 0) {
				setTimeout(function() {
							_t.close();
						}, MigScript.Settings.local_settings[16] * 1000);
			}
		};

		this.alert = function(caption, text) {
			this.isActive = true;
			this.text = text;
			this.caption = caption;
			if (this.id == 1) {
				this.show(caption, text);
			}
			// moveOut();
		};

		/*
		 * var moveOut = function() { this.cont.style.left =
		 * document.body.clientWidth; this.x = document.body.clientWidth;
		 * this.cont.setAttribute("x", uneval(this.x)); var timer =
		 * setTimeout(function() { move(); }, 20);
		 * this.cont.setAttribute("timer", uneval(timer));
		 * 
		 * function move() { var left = _t.cont.style.offsetLeft;
		 * _t.cont.style.left = (left - 20) + "px"; if (left <
		 * (document.body.clientWidth - 300 - 150 * Math.cos(Math.PI / 2 *
		 * MigScript.CustomObjects.alerters.length / 4))) {
		 * clearTimeout(eval(_t.cont.getAttribute("timer")));
		 * 
		 * _t.x = left; _t.y = top; MigScript.CustomObjects.serializableAlerter =
		 * {'id': _t.id,'text': _t.text, 'caption': _t.caption, 'x': _t.x, 'y':
		 * _t.y, 'prefix':_t.prefix}; if
		 * (MigScript.CustomObjects.serializableAlerters == null) {
		 * MigScript.CustomObjects.serializableAlerters = []; }
		 * MigScript.CustomObjects.serializableAlerters.push(MigScript.CustomObjects.serializableAlerter);
		 * MigScript.Util.serialize("alerts",
		 * MigScript.CustomObjects.serializableAlerters); } else { timer =
		 * setTimeout(function() { move(); }, 20); _t.cont.setAttribute("x",
		 * uneval(left - 20)); } } };
		 */
		var onDragStop = function() {
			if (_t.isActive) {
				var x = _t.cont.offsetLeft;
				var y = _t.cont.offsetTop;
				MigScript.Util.serialize(_t.prefix + "posX", x);
				MigScript.Util.serialize(_t.prefix + "posY", y);
			}
		};

		var remove = function() {
			try {
				onDragStop();
				_t.isActive = false;

				document.body.removeChild(_t.cont);
				for (var i = 0; i < MigScript.CustomObjects.serializableAlerters.length; i++) {
					if (MigScript.CustomObjects.serializableAlerters[i] != null) {
						if (MigScript.CustomObjects.serializableAlerters[i].id == _t.id) {
							MigScript.CustomObjects.serializableAlerters[i] = null;
							break;
						}
					}
				}
				MigScript.Util.serialize("alerts",
						MigScript.CustomObjects.serializableAlerters);
				showNext();
			} catch (e) {
				MigScript.log(e);
			}
		};

		this.close = function() {
			MigScript.UI.animateHide(this.cont, remove);
		};

		this.init = function(prefix) {
			if (prefix) {
				this.prefix = prefix + "_";
			} else {
				this.prefix = "";
			}
			push();
		};
		this.init(prefix);
	},
	FloatListClass : function(name, label, config) {
		var _t = this;
		this.isShown = true;
		// this.isShown = false;
		var floater;
		this.name = name + "_";
		this.onClose = null;
		this.onPopulate = null;
		this.onPadDeleted = null;
		config = config || {};

		if (!config.minWidth) {
			config.minWidth = 105;
		}
		if (!config.minHeight) {
			config.minHeight = 64;
		}
		if (!config.list) {
			config.list = [];
		}
		if (!config.padCondition) {
			config.padCondition = function() {
				return false;
			};
		}
		if (!config.hasOwnProperty("avatar")) {
			config.avatar = true;
		}
		if (!config.hasOwnProperty("padDelete")) {
			config.padDelete = false;
		}
		if (!config.hasOwnProperty("strictLink")) {
			config.strictLink = false;
		}
		if (!config.hasOwnProperty("update")) {
			config.update = false;
		}

		this.list = config.list;

		var deletePad = function(padNum) {
			_t.body.removeChild(MigScript.DomUtil.getDescendantById(_t.body,
					"nd" + padNum));
			config.list[padNum - 1] = null;
			if (_t.onPadDeleted) {
				_t.onPadDeleted(padNum);
			}
		};
		this.addPad = function(uid, linkHTML, num) {
			var ndiv = MigScript.DomUtil.dc("div");
			ndiv.id = "nd" + num;
			// Используем стиль модуля слежения за друзьями
			if (!config.padCondition(uid, num)) {
				ndiv.className = "fr_pad";
			} else {
				ndiv.className = "fav_fr_pad";
			}

			if (!config.strictLink) {
				var c_link = MigScript.DomUtil.dc("div");
				c_link.className = "floater_link";
				var link = MigScript.DomUtil.dc("a");

				link.href = MigScript.HOST + "/id" + uid;
				link.innerHTML = linkHTML;

				// link.style.color = "#0000ff";
				link.target = "_top";
				c_link.appendChild(link);
				ndiv.appendChild(c_link);
			} else {
				ndiv.innerHTML = linkHTML;
			}
			if (config.avatar) {
				link.addEventListener("mouseover", function(e) {
					var uid = this.href.substring(this.href.indexOf("/id") + 3);
					MigScript.UI.showAvatar(uid, e.clientX, 170, e.pageY,
							_t.body.offsetWidth);
				}, true);
				link.addEventListener("mouseout", function(e) {
					var uid = this.href.substring(this.href.indexOf("/id") + 3);
					MigScript.UI.hideAvatar(uid);
				}, true);
			}

			ndiv.addEventListener("mouseover", function() {
						MigScript.DomUtil.highlight(this);
					}, true);
			ndiv.addEventListener("mouseout", function() {
						MigScript.DomUtil.unlight(this);
					}, true);
			this.body.appendChild(ndiv);

			if (config.padDelete) {

				var crossDiv = MigScript.DomUtil.dc("div");
				crossDiv.className = "cross";
				var a = MigScript.DomUtil.dc("a");
				a.innerHTML = "[x]";
				a.style.color = "#ff0000";
				a.style.cursor = "pointer";
				a.id = "cross" + num;
				var numId = num;
				// a.className = "cross";
				a.addEventListener("click", function() {
							deletePad(numId);
						}, true);
				ndiv.insertBefore(crossDiv, c_link);
				crossDiv.appendChild(a);
			}
		};
		this.populateList = function(list) {
			// if (this.isShown) {
			list = list || config.list;
			MigScript.DomUtil.removeChildNodes(this.body);
			for (var i = 1; i <= list.length; i++) {
				if (!config.strictLink) {
					this.addPad(list[i - 1][0], list[i - 1][1], i);
				} else {
					this.addPad(null, list[i - 1], i);
				}
			}
			if (this.onPopulate) {
				this.onPopulate();
			}
			// }
		};

		this.wakeUp = function(x, y) {
			this.isShown = true;
			MigScript.Util.serialize(name, true);
			floater.wakeUp(x, y);
		};

		var createUI = function() {
			var x, y;

			x = (document.documentElement.clientWidth - config.minWidth) / 2;
			y = (document.documentElement.clientHeight - config.minHeight) / 2;

			x = MigScript.Util.deserialize(_t.name + "x", x);
			y = MigScript.Util.deserialize(_t.name + "y", y);

			MigScript.Util.serialize(name, true);
			floater = new MigScript.CustomObjects.FloaterClass(x, y, name,
					label, config);
			floater.onClose = function() {
				_t.isShown = false;
				MigScript.Util.serialize(name, false);
				// _t.isShown = false;
				if (_t.onClose) {
					_t.onClose();
				}
			};
			_t.body = floater.body;
			_t.txt = floater.txt;

			if (config.update) {
				var a = MigScript.DomUtil.dc("a");
				_t.txt.appendChild(a);
				a.style.cursor = "pointer";
				a.addEventListener("click", function() {
							this.innerHTML = "<img src=\""
									+ MigScript.UI.Images.loaderImg() + "\"/>";
							config.update();
						}, true);
				a.innerHTML = "[Обновить]";
			}

		};
		createUI();
	},
	MultiPanelClass : function(config) {
		this.buttons = [];

		var createUI = function() {
			this.body = MigScript.DomUtil.dc("div");
			this.body.className = "multipanel";
			this.body.style.position = "absolute";
			this.body.style.left = "0px";
			this.body.style.top = document.documentElement.clientHeight
					- this.body.offsetHeight + "px";
			document.body.appendChild(this.body);
		}();
	}
};

MigScript.Alerts = {
	checkAlerts : function(id) {
		MigScript.CustomObjects.serializableAlerters = MigScript.Util
				.deserialize("alerts", []);
		if (MigScript.Util
				.notNullCount(MigScript.CustomObjects.serializableAlerters) == 0) {
			MigScript.CustomObjects.serializableAlerters = [];
		}
		MigScript.log("Serializable alerts is "
				+ MigScript.CustomObjects.serializableAlerters);
		if (MigScript.CustomObjects.serializableAlerters != null) {
			for (var i = 0; i < MigScript.CustomObjects.serializableAlerters.length; i++) {
				var alert0 = MigScript.CustomObjects.serializableAlerters[i];
				if (alert0 != null) {
					var alert1 = new MigScript.CustomObjects.AlerterClass(alert0.prefix);
					alert1.alert(alert0.caption, alert0.text);
				}

				MigScript.CustomObjects.serializableAlerters[i] = null;
			}
		}
	}
};

MigScript.UI = {
	getOpaqueBg : function() {
		var el;
		el = MigScript.DomUtil.ge("hider");
		if (el == undefined) {
			el = MigScript.DomUtil.dc("div");
			el.id = "hider";
			el.style.height = document.height + "px";
			document.body.appendChild(el);
		} else {
			el.style.display = "inline";
		}
		return el;
	},
	createVkBtnSet : function() {
		var btns = MigScript.DomUtil.dc("div");
		btns.id = "buttons";
		var ul = MigScript.DomUtil.dc("div");
		ul.id = "btnset";
		ul.className = "nNav";
		var c = MigScript.DomUtil.dc("center");
		c.appendChild(btns);
		btns.appendChild(ul);
		return c;
	},

	addVkBtn : function(label, width, onClick) {
		var ul = MigScript.DomUtil.ge("btnset");
		if (ul != null) {
			var li = MigScript.DomUtil.dc("div");
			li.className = "vkbtn";
			li.style.width = width;
			ul.appendChild(li);

			var btn = MigScript.DomUtil.dc("div");
			btn.innerHTML = label;
			btn.style.display = "inline";
			btn.style.marginLeft = "10px";
			btn.className = "ncc";
			btn.addEventListener("click", onClick, true);
			btn.style.cursor = "pointer";
			btn.style.width = (width);

			li.appendChild(btn);

		}
	},

	showDFDialog : function(r, uid) {
		MigScript.UI.getOpaqueBg();
		MigScript.UI.Dialog.getDialog("Удаление из друзей");
		MigScript.UI.Dialog.showBlock(r);

		var fok_btn = MigScript.DomUtil.dc("div");
		fok_btn.id = "fr_ok_btn";
		fok_btn.className = "box_button";
		fok_btn.innerHTML = "Удалить";
		MigScript.DomUtil.ge("dlg_ok_btn").appendChild(fok_btn);
		// MigScript.log(uid);

		fok_btn.addEventListener("click", function() {
					MigScript.Menu.declineFriend(uid);
				}, true);
	},

	showAFDialog : function(r, uid) {
		MigScript.UI.getOpaqueBg();
		MigScript.UI.Dialog.getDialog("Запрос дружбы");
		MigScript.UI.Dialog.showBlock(r);

		var fok_btn = MigScript.DomUtil.dc("div");
		fok_btn.id = "fr_ok_btn";
		fok_btn.className = "box_button";
		fok_btn.innerHTML = "Добавить";
		MigScript.DomUtil.ge("dlg_ok_btn").appendChild(fok_btn);
		// MigScript.log(uid);

		fok_btn.addEventListener("click", function() {
					MigScript.Menu.acceptFriend(uid);
				}, true);
	},
	placeBookmarkStubs : function() {

		if (MigScript.Util.checkLocation("id")
				&& MigScript.DomUtil.ge("addToFaves")) {
			MigScript.DomUtil.removeChildNodes(MigScript.DomUtil
					.ge("addToFaves"));
			var a = MigScript.DomUtil.dc("a");
			a.style.cursor = "pointer";
			if (MigScript.Friends
					.isFavFriend(MigScript.DomUtil.ge("mid").value)) {

				a.innerHTML = "Удалить из избранного";
				a.addEventListener("click", function(e) {
							MigScript.Bookmarks.unbookAction(MigScript.DomUtil
									.ge("mid").value);
						}, false);
			} else {
				a.innerHTML = "Добавить в избранное";
				a.addEventListener("click", function(e) {
							MigScript.Bookmarks.bookAction(MigScript.DomUtil
									.ge("mid").value);
						}, false);
			}
			MigScript.DomUtil.ge("addToFaves").appendChild(a);
		}
	},
	killAlerts : function() {
		for (var i = 0; i < MigScript.CustomObjects.alerters.length; i++) {
			if (MigScript.CustomObjects.alerters[i] != null) {
				MigScript.CustomObjects.alerters[i].close();
			}
		}
		MigScript.log("alerts cleaned out");
	},
	createUI : function() {
		var a;
		var parent;
		var el;
		var wrap;
		// Добавляем линк на настройки

		// Линк в отдельном диве рядом с баннером контакта

		var sett_div = MigScript.DomUtil.geByClass("moreDiv", null, "div")[0];
		var sett_link = MigScript.DomUtil.dc("a");
		sett_link.id = "sett_link";
		var txt = document.createTextNode("Mig[vk]Script");
		// var sett_img = MigScript.DomUtil.dc("img");
		// sett_img.src = MigScript.UI.Images.wrenchImg();
		// sett_img.id = "sett_img";

		// sett_img.style.width = "12px";
		sett_link.appendChild(txt);
		// sett_link.appendChild(sett_img);

		var sett_li = MigScript.DomUtil.dc("li");
		sett_li.appendChild(sett_link);
		sett_li.style.cursor = "pointer";
		sett_link.addEventListener("click", function() {
					MigScript.UI.Settings.openSettings();
				}, true);
		MigScript.DomUtil.ge("nav").insertBefore(sett_li, sett_div);

		// Делаем финт ушами со всеми флешами
		try {
			var embed = MigScript.DomUtil.ge("flash_app");
			if (!embed) {
				embed = MigScript.DomUtil.ge("player");
			}
			if (embed) {
				embed.setAttribute("wmode", "opaque");
			}
		} catch (e) {
		}

		// Меняем меню
		MigScript.UI.MainMenu.init();
		MigScript.UI.MainMenu.extendMenu();

		// ////// Добавляем кастомный фон полученных писем
		GM_addStyle(".mailbox table tr.newRow{background-color:"
				+ MigScript.Settings.local_settings[5] + "!important;}");
		GM_addStyle(".mailbox table tr.newRow .messageBody {color:"
				+ MigScript.Settings.local_settings[6] + "!important;}");

		//
		// Работа с фото local
		//

		if (MigScript.Util.checkLocation("photo")) {
			// ////// Добавляем линк "Отметить всех"
			el = MigScript.DomUtil.dc("div");
			el.addEventListener("click", MigScript.Photo.markAll, true);
			el.innerHTML = "<br><b><a>Отметить всех</a></b>";
			el.style.cursor = "pointer";
			var el2 = MigScript.DomUtil.ge("photoactions");
			if (el2) {
				el2.appendChild(el);
			}

			// ////// Добавляем линк "Удалить все отметки"
			if (MigScript.Photo.getTotalMarksNumber() > 0
					&& MigScript.DomUtil.ge("photoactions").childNodes.length > 8) {
				el = MigScript.DomUtil.dc("a");
				el.addEventListener("click", MigScript.Photo.deleteAllMarks,
						true);
				el.style.cursor = "pointer";
				el.innerHTML = "Удалить все отметки ("
						+ MigScript.Photo.getTotalMarksNumber() + ")";
				MigScript.DomUtil.ge("photoactions").appendChild(el);
			}
		}

		if (MigScript.Util.checkLocation("photos")) {
			if (MigScript.Util.checkLocation("act=added")) {

				var c = MigScript.DomUtil.dc("center");
				div = MigScript.DomUtil.dc("div");
				div.id = "btnset";
				c.appendChild(div);
				// MigScript.DomUtil.ge("content").insertBefore(a,
				// MigScript.DomUtil.ge("searchResults"));
				MigScript.DomUtil.ge("searchResults").appendChild(c);
				MigScript.UI.addVkBtn("<b>Я присутствую НА ВСЕХ фото</b>",
						"400px", function() {
							MigScript.Photo.confirmAll();
						});
			}
		}

		//
		// Работа с видео
		//

		if (MigScript.Util.checkLocation("video")
				&& !MigScript.Util.checkLocation("gsearch")) {
			var text = document.documentElement.innerHTML;

			var url = MigScript.Video.getVideoUrl(text);

			parent = MigScript.DomUtil.ge("videoactions");
			var link;
			if (MigScript.Settings.local_settings[34]) {
				link = MigScript.DomUtil.dc("a");
				link.href = url;
				link.innerHTML = "<b>Скачать<b>";
				if (parent) {
					parent.appendChild(link);
				}
			}
			link = MigScript.DomUtil.dc("a");
			link.style.cursor = "pointer";
			link.innerHTML = "Отметить всех";
			link.addEventListener("click", function() {
						MigScript.Video.markAll();
					}, true);
			if (parent) {
				parent.appendChild(link);
			}

			// Удалить всех
			if (MigScript.Video.getTotalMarksNumber() > 0
					&& MigScript.DomUtil.ge("videoactions").childNodes.length > 7) {
				el = MigScript.DomUtil.dc("a");
				el.addEventListener("click", MigScript.Video.deleteAllMarks,
						true);
				el.style.cursor = "pointer";
				el.innerHTML = "Удалить все отметки ("
						+ MigScript.Video.getTotalMarksNumber() + ")";
				MigScript.DomUtil.ge("videoactions").appendChild(el);
			}
		}

		//
		// Работа с аудио
		//

		if (MigScript.Settings.local_settings[35]) {
			// Добавляем кнопки скачивания аудио
			if (MigScript.Util.checkLocation("audio.php")
					|| MigScript.Util.checkLocation("id")
					|| MigScript.Util.checkLocation("club")) {
				try {
					MigScript.UI.placeADownLinks();
					/*
					 * if (!(MigScript.Util.checkLocation("id") ?
					 * !MigScript.Util.checkLocation("gid") :
					 * MigScript.Util.checkLocation("gid")) ||
					 * MigScript.Util.checkLocation("audio.php")) { var a =
					 * MigScript.DomUtil.dc("a"); a.style.cursor = "pointer";
					 * a.innerHTML = "Добавить ссылки на скачивание";
					 * a.addEventListener("click", function() {
					 * MigScript.UI.placeADownLinks(); }, true);
					 * MigScript.DomUtil.ge("header").appendChild(a); }
					 */
				} catch (e1) {
					MigScript.log(e1);
				}
				wrap = MigScript.DomUtil.ge("audiosWrap");
				if (wrap) {
					wrap.addEventListener("DOMNodeInserted", function(e) {

						if ((e.target.id != null) && (e.target.id == "audios")) {
							MigScript.UI.placeADownLinks();
						}
					}, true);
				}
			}
		}

		//
		// Работа со страницей поиска
		//

		if (MigScript.Util.checkLocation("gsearch")) {

			// Аудио
			if (MigScript.Settings.local_settings[35]) {
				if (MigScript.Util.checkLocation("section=audio")
						|| MigScript.Util.checkLocation("section\%5D=audio")) {
					MigScript.UI.placeAsearchDownLinks();
					/*
					 * var a = MigScript.DomUtil.dc("a"); a.style.cursor =
					 * "pointer"; a.innerHTML = "Добавить ссылки на скачивание";
					 * a.addEventListener("click", function() {
					 * MigScript.UI.placeDownLinks(); }, true);
					 * MigScript.DomUtil.ge("header").appendChild(a);
					 */

					wrap = MigScript.DomUtil.ge("results");
					if (wrap) {
						wrap.addEventListener("DOMNodeInserted", function(e) {

							if ((e.target.className != null)
									&& (e.target.className == "audioRow")) {

								var img = e.target.getElementsByTagName("img")[0];
								MigScript.UI.placeAsearchLink(img);

								/*
								 * var dimg = MigScript.DomUtil.dc("img");
								 * dimg.src = MigScript.UI.Images.downloadImg();
								 * dimg.style.width = "16px"; dimg.style.padding =
								 * "1px"; dimg.style.cursor = "pointer"; //
								 * dimg.id = "dx" + aid;
								 * img.parentNode.style.width = "50px";
								 * 
								 * var str = img.getAttribute("onclick"); str =
								 * str.match(/[0-9]+,[0-9]+,[0-9]+,\'(\w+)\',[0-9]+/).toString();
								 * str = str.split(","); var href = "http://cs" +
								 * str[1] + ".vkontakte.ru/u" + str[2] +
								 * "/audio/" + str[5] + ".mp3";
								 * 
								 * 
								 * dimg.title = "Скачать"; var a =
								 * MigScript.DomUtil.dc("a"); a.href = href;
								 * 
								 * img.parentNode.appendChild(a);
								 * a.appendChild(dimg);
								 */
							}
						}, true);
					}
				}
			}

			// Видео
			if (MigScript.Settings.local_settings[34]) {
				if (MigScript.Util.checkLocation("section=video")
						|| MigScript.Util.checkLocation("section\%5D=video")) {
					if (MigScript.Settings.local_settings[10]) {
						MigScript.UI.placeVDownLinks();
					}
					a = MigScript.DomUtil.dc("a");
					a.style.cursor = "pointer";
					a.innerHTML = "Добавить ссылки на скачивание";
					a.addEventListener("click", function() {
								MigScript.UI.placeDownLinks();
							}, true);
					MigScript.DomUtil.ge("header").appendChild(a);

				}
			}

		}

		// Заменяем кнопку "Удалить из избранного" и "Добавить в избранное" на
		// странице друга
		MigScript.UI.placeBookmarkStubs();

		// Работа со страницей избранного
		if (MigScript.Util.checkLocation("fave.php")) {
			parent = MigScript.DomUtil.ge("Information").parentNode;
			if (MigScript.Settings.local_settings[33]) {
				var favedDiv = MigScript.DomUtil.dc("div");
				var headerDiv = MigScript.DomUtil.dc("div");
				headerDiv.innerHTML = "<div class=\"flexHeader clearFix\"><div><h2>Вы в закладках у этих людей</h2></div></div>";
				headerDiv.className = "bOpen";
				parent.appendChild(headerDiv);
				parent.appendChild(favedDiv);
				favedDiv.innerHTML = "<img src='"
						+ MigScript.UI.Images.loaderImg() + "'/>";

				MigScript.WhoFaved.getList(function() {
					favedDiv.innerHTML = "";
					for (var l = 0; l < MigScript.WhoFaved.favedList.length; l++) {
						var faved = MigScript.WhoFaved.favedList[l];
						var d = MigScript.DomUtil.dc("div");
						d.style.width = "60px";
						d.style.setProperty("float", "left", "");
						d.style.padding = "10px 2px 5px 2px";
						favedDiv.appendChild(d);

						var imgA = MigScript.DomUtil.dc("a");
						imgA.href = MigScript.HOST + "/id" + faved[0];
						imgA.style.cursor = "pointer";

						var imgDiv = MigScript.DomUtil.dc("div");
						imgDiv.style.overflow = "hidden";
						imgDiv.style.height = "55px";
						d.appendChild(imgDiv);

						var nameDiv = MigScript.DomUtil.dc("div");
						nameDiv.innerHTML = "<a href=\"" + MigScript.HOST
								+ "/id" + faved[0] + "\">" + faved[1] + "</a>";
						d.appendChild(nameDiv);

						var img = MigScript.DomUtil.dc("img");
						img.src = faved[2];
						img.style.width = "55px";
						imgA.appendChild(img);
						imgDiv.appendChild(imgA);
					}

				});

			}

		}

		// работа с профилями

		if (window.location.href.match(/id\d+/)) {
			var cont = MigScript.DomUtil.ge("activity_time");

			if (!cont) {
				a = MigScript.DomUtil.dc("a");
				a.id = "activity_time";
				a.style.cursor = "pointer";
				a.style.fontSize = "8pt";
				a.innerHTML = "[История статусов пользователя]";
				var uid = window.location.href.match(/\d+/).toString();
				a.addEventListener("click", function() {
							MigScript.UI.getActivityHistory(uid);
						}, false);

				parent = MigScript.DomUtil.geByClass("accountInfo clearFix")[0];
				parent.appendChild(MigScript.DomUtil.dc("br"));
				var d = MigScript.DomUtil.dc("div");
				// d.style.setProperty("float","left","");
				d.id = "hlink_cont";
				d.style.padding = "2px";
				d.style.clear = "both";
				parent.appendChild(d);
				d.appendChild(a);
				// parent.appendChild(MigScript.DomUtil.dc("br"));
				cont = MigScript.DomUtil.dc("div");
				cont.id = "hist_cont";
				cont.style.borderTop = "1px solid #DAE1E8";
				parent.appendChild(cont);
				MigScript.DomUtil.hide(cont);
			}
		}

		//
		// Работа с группой
		//

		if (MigScript.Util.checkLocation("club")) {
			// Кнопка "Пригласить всех"
			var ul = MigScript.DomUtil.ge("addToFaves").parentNode;
			var li = MigScript.DomUtil.dc("li");
			a = MigScript.DomUtil.dc("a");
			a.innerHTML = "<b>Пригласить всех друзей</b>";
			a.id = "gr_frCall";
			a.style.cursor = "pointer";
			a.addEventListener("click", function() {
						MigScript.Group.callFriends();
					}, true);
			li.appendChild(a);
			ul.appendChild(li);
		}

		if (MigScript.Util.checkLocation("groups")) {

			// Кнопка "Выделить друзей"
			var sep;
			var div;
			if (MigScript.DomUtil.geByClass("s_sep")) {
				sep = MigScript.DomUtil.geByClass("s_sep")[0];
			}
			if (sep) {
				var new_sep = MigScript.DomUtil.dc("div");
				new_sep.className = "s_sep";
				sep.parentNode.insertBefore(new_sep, sep.nextSibling);

				div = MigScript.UI.Group.createMngButton("Выделить друзей",
						"settings5", function() {
							MigScript.UI.Group.markFriends();
						});
				sep.parentNode.insertBefore(div, sep.nextSibling);
			}

			// Кнопка "Выгнать всех не друзей на странице"
			if (MigScript.Group.isAdmin()) {
				div = MigScript.UI.Group.createMngButton(
						"Выгнать всех не друзей на странице", null, function() {
							MigScript.Group.kickNoFriends();
						});
				sep.parentNode.insertBefore(div, sep.nextSibling);
			}
		}

		if (MigScript.Util.checkLocation("topic")) {

			MigScript.UI.Group.addReplyButtons();
			MigScript.DomUtil.ge("rows_content").addEventListener(
					"DOMNodeInserted", function(e) {
						if (e.target.className != null
								&& e.target.className.match(/post/)) {
							var ar = e.target.getElementsByTagName("div");
							MigScript.UI.Group.addReplyButton(ar);
						}
					}, true);

		}

		// модуль слежения
		MigScript.UI.ExFriends.init();

		var adv = MigScript.DomUtil.ge("banner1");
		if (adv != null) {
			adv.style.display = "none";
			adv.innerHTML = "";
		}
		adv = MigScript.DomUtil.ge("banner2");
		if (adv != null) {
			adv.style.display = "none";
			adv.innerHTML = "";
		}
		adv = MigScript.DomUtil.geByClass("ad_box");
		if (adv) {
			for (var i = 0; i < adv.length; i++) {
				try {
					MigScript.log("left_Ad href: " + adv[i].href);
					if (adv[i].href.match(/ads.php/)) {
						adv[i].style.display = "none";
						MigScript.log("left_Ad href matched. Ad removed");
					}
				} catch (e) {
					try {
						if (adv.href.match(/ads.php/)) {
							adv.style.display = "none";
						}
					} catch (e2) {

					}
				}
			}
		}

		// ////// Добавляем меню ко всем ссылкам на профили...
		if (MigScript.Settings.local_settings[1]) {
			document.body.addEventListener("mouseover", function(e) {
						MigScript.UI.addContactMenu(e, e.target, e.target
										.toString());
					}, false);
			MigScript.UI.purgeContactMenu();
		}

		// Прямые ссылки
		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			if (links[i].href.split('away.php?to=').length == 2) {
				links[i].href = unescape(links[i].href.split('away.php?to=')[1]);
			}
			if (links[i].href === "http://vkontakte.ru/help.php?page=target") {
				MigScript.DomUtil.ge("sideBar")
						.removeChild(links[i].parentNode);
			}
		}

		// Останавливаем автоматическую усвтановку статуса и увеличиваем его
		// длину до 256 символов
		var ae = MigScript.DomUtil.ge("edit_activity_text");
		if (ae) {
			ae.removeAttribute("onblur", "");
			ae.setAttribute("maxlength", "255");
		}

		// (new MigScript.CustomObjects.AlerterClass()).alert("Hello!",
		// "<center>Здрасте!</center><br>Я - <b>всплывающее окошко</b>. Я буду
		// вас информировать! (;");
	},

	placeVDownLinks : function() {
		var a_cont = MigScript.DomUtil.ge("results");
		for (var i = 0; i < a_cont.childNodes.length; i++) {
			var el = a_cont.childNodes[i];
			if (el.id != null && el.id.match(/video/)) {
				var vid = el.id.substring(5);
				var div = MigScript.DomUtil.ge("videoInfo" + vid);
				if (MigScript.DomUtil.ge("dx" + vid) == null) {
					var xurl = div.childNodes[1].childNodes[0].href;
					var _ajax = new MigScript.Ajax.AjaxClass(function(a, r) {
								var vid = /vkid:.(.*?).,/.exec(r)[1];
								// MigScript.log(vid);
								var div = MigScript.DomUtil.ge("videoInfo"
										+ vid);
								a = MigScript.DomUtil.dc("a");
								a.href = MigScript.Video.getVideoUrl(r);
								a.innerHTML = "Скачать видео";
								a.id = "dx" + vid;
								var br = MigScript.DomUtil.dc("br");
								div.appendChild(br);
								div.appendChild(a);
							});
					_ajax.get(xurl);
				}
			}
		}
	},

	getActivityHistory : function(uid) {
		var ajax = new MigScript.Ajax.AjaxClass();
		ajax.get('/profile.php', {
					'activityhistory' : '1',
					'id' : uid
				});

		MigScript.DomUtil.ge("activity_time").innerHTML = "<img src=\""
				+ MigScript.UI.Images.loaderImg() + "\"/>";
		ajax.onDone = function(ax, r) {
			var c = MigScript.DomUtil.ge("hist_cont");
			MigScript.DomUtil.show("hist_cont");
			c.innerHTML = r;

			MigScript.DomUtil.removeChildNodes(MigScript.DomUtil
					.ge("hlink_cont"));

			var a = MigScript.DomUtil.dc("a");
			a.id = "activity_time";
			a.style.cursor = "pointer";
			a.style.fontSize = "8pt";
			a.innerHTML = "[Спрятать историю]";
			var uid = window.location.href.match(/\d+/).toString();
			MigScript.DomUtil.ge("hlink_cont").appendChild(a);
			a.addEventListener("click", function() {
						MigScript.DomUtil.hide("hist_cont");

						MigScript.DomUtil.removeChildNodes(MigScript.DomUtil
								.ge("hlink_cont"));

						var a = MigScript.DomUtil.dc("a");
						a.id = "activity_time";
						a.style.cursor = "pointer";
						a.style.fontSize = "8pt";
						MigScript.DomUtil.ge("hlink_cont").appendChild(a);
						a.innerHTML = "[История статусов пользователя]";
						var uid = window.location.href.match(/\d+/).toString();
						a.addEventListener("click", function() {
									MigScript.UI.getActivityHistory(uid);
								}, false);

					}, false);
		};
	},

	placeAsearchLink : function(img, aid) {
		var dimg = MigScript.DomUtil.dc("img");
		dimg.src = MigScript.UI.Images.downloadImg();
		dimg.style.width = "16px";
		dimg.style.padding = "1px";
		dimg.style.cursor = "pointer";
		if (aid) {
			dimg.id = "dx" + aid;
		}
		img.parentNode.style.width = "50px";

		// Парсим исполнителя и название
		var infoc = img.parentNode.parentNode
				.getElementsByClassName("audioTitle")[0].childNodes;
		var perf, title;
		for (var j = 0; j < infoc.length; j++) {
			if (infoc[j].id != null) {
				if (infoc[j].id.match(/performer/)) {
					perf = infoc[j].innerHTML;
				} else if (infoc[j].id.match(/title/)) {
					if (infoc[j].childNodes != null) {
						if (infoc[j].childNodes[0].tagName == "a") {
							title = infoc[j].childNodes[0].innerHTML;
						} else {
							title = infoc[j].childNodes[0].textContent;
						}
					} else {
						title = infoc[j].innerHTML;
					}
				}
			}
		}

		// Не показываем дубликаты
		if (MigScript.Settings.local_settings[36]) {
			var dur = img.parentNode.parentNode
					.getElementsByClassName("duration")[0].innerHTML;
			var aobj = {
				'artist' : perf.toLowerCase(),
				'title' : title.toLowerCase(),
				'dur' : dur
			};
			var f = false;
			for (var l = 0; l < MigScript.Audio.doubles.length; l++) {
				if (MigScript.Audio.doubles[l].artist == aobj.artist) {
					if (MigScript.Audio.doubles[l].title == aobj.title) {
						if (MigScript.Audio.doubles[l].dur == aobj.dur) {
							img.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
							f = true;
							break;
						}
					}
				}
			}
			if (!f) {
				MigScript.Audio.doubles.push(aobj);
			}
		}

		var str = img.getAttribute("onclick");
		str = str.match(/[0-9]+,[0-9]+,[0-9]+,\'(\w+)\',[0-9]+/).toString();
		str = str.split(",");
		var href = "http://cs" + str[1] + ".vkontakte.ru/u" + str[2]
				+ "/audio/" + str[5] + ".mp3";

		perf = perf.replace("&amp;", "&");
		title = title.replace("&amp;", "&");

		dimg.title = perf + " - " + title;
		var a = MigScript.DomUtil.dc("a");
		a.href = href;

		img.parentNode.appendChild(a);
		a.appendChild(dimg);

		if (MigScript.Settings.local_settings[42]) {
			var lyr = MigScript.DomUtil.dc("img");
			lyr.style.width = "32px";

			lyr.src = MigScript.UI.Images.lyricsImg();
			lyr.addEventListener("click", function() {
						window.open(
								"http://www.lyricsplugin.com/winamp03/plugin/?artist="
										+ encodeURIComponent(perf.replace("'",
												"\\'").replace(/&amp;/g, "&"))
										+ "&title="
										+ encodeURIComponent(title.replace("'",
												"\\'").replace(/&amp;/g, "&"))
										+ "", "_blank",
								"width=300, height=500,scrollbars=1");
					}, false);
			lyr.style.marginLeft = "2px";
			lyr.style.cursor = "pointer";
			img.parentNode.appendChild(lyr);
		}
	},
	placeAsearchDownLinks : function() {
		var a_cont = MigScript.DomUtil.ge("results");
		MigScript.Audio.doubles = [];
		for (var i = 0; i < a_cont.childNodes.length; i++) {
			var el = a_cont.childNodes[i];
			if (el.id != null && el.id.match(/audio/)) {
				var aid = el.id.substring(5);
				if (MigScript.DomUtil.ge("dx" + aid) == null) {
					var img = MigScript.DomUtil.ge("imgbutton" + aid);
					MigScript.UI.placeAsearchLink(img, aid);
				}
			}
		}
	},

	placeDownLinks : function() {
		MigScript.UI.placeVDownLinks();
		MigScript.UI.placeADownLinks();
	},

	placeADownLinks : function() {
		var a_cont = MigScript.DomUtil.geByClass("playimg");
		if (a_cont) {
			for (var i = 0; i < a_cont.length; i++) {
				var img = a_cont[i];
				// var aid = el.id.substring(5);
				var dimg = MigScript.DomUtil.dc("img");
				dimg.src = MigScript.UI.Images.downloadImg();
				dimg.style.width = "16px";
				dimg.style.padding = "1px";
				dimg.style.cursor = "pointer";
				img.parentNode.style.width = "50px";

				var str = img.getAttribute("onclick");
				str = str.match(/\'.+'/).toString();
				str = str.replace(/\'/g, "");
				var href = str;

				// Парсим исполнителя и название
				var infoc;
				var perf;
				var title;
				try {
					infoc = img.parentNode.parentNode
							.getElementsByClassName("audioTitle")[0].childNodes;
					for (var j = 0; j < infoc.length; j++) {
						if (infoc[j].id != null) {
							if (infoc[j].id.match(/performer/)) {
								perf = infoc[j].childNodes[0].innerHTML;
							} else if (infoc[j].id.match(/title/)) {
								if (infoc[j].childNodes != null) {
									if (infoc[j].childNodes[0].tagName == "a") {
										title = infoc[j].childNodes[0].innerHTML;
									} else {
										title = infoc[j].childNodes[0].textContent;
									}
								} else {
									title = infoc[j].innerHTML;
								}
							}
						}
					}
				} catch (e) {

					// Аналогично для стены
					infoc = img.parentNode.parentNode
							.getElementsByClassName("duration")[0].parentNode.childNodes[0].childNodes;
					for (var j = 0; j < infoc.length; j++) {
						if (infoc[j].id != null) {
							if (infoc[j].id.match(/performer/)) {
								perf = infoc[j].childNodes[0].innerHTML;
							} else if (infoc[j].id.match(/title/)) {
								title = infoc[j].innerHTML;
							}
						}
					}
				}

				perf = perf.replace("&amp;", "&");
				title = title.replace("&amp;", "&");

				dimg.title = perf + " - " + title;
				var a = MigScript.DomUtil.dc("a");
				a.href = href;

				img.parentNode.appendChild(a);
				a.appendChild(dimg);
				if (MigScript.Settings.local_settings[42]) {
					var lyr = MigScript.DomUtil.dc("img");
					lyr.style.width = "32px";

					lyr.src = MigScript.UI.Images.lyricsImg();
					lyr.addEventListener("click", function() {
								window
										.open(
												"http://www.lyricsplugin.com/winamp03/plugin/?artist="
														+ encodeURIComponent(perf
																.replace("'",
																		"\\'")
																.replace(
																		/&amp;/g,
																		"&"))
														+ "&title="
														+ encodeURIComponent(title
																.replace("'",
																		"\\'")
																.replace(
																		/&amp;/g,
																		"&"))
														+ "", "_blank",
												"width=300, height=500,scrollbars=1");
							}, false);
					lyr.style.marginLeft = "2px";
					lyr.style.cursor = "pointer";
					lyr.style.marginLeft = "2px";
					lyr.style.cursor = "pointer";
					dimg.parentNode.parentNode.appendChild(lyr);
				}
				// Кнопка "Добавить"
				/*
				 * dimg = MigScript.DomUtil.dc("img"); dimg.src =
				 * MigScript.UI.Images.addMediaImg(); dimg.style.width = "16px";
				 * dimg.style.padding = "1px"; dimg.style.cursor = "pointer";
				 * 
				 * str = img.getAttribute("onclick"); str =
				 * str.match(/\'.+'/).toString(); str = str.replace(/\'/g,"");
				 * var href = str;
				 * 
				 * dimg.addEventListener("click", function(){addAudio(aid);},
				 * false); dimg.title = "Добавить к себе";
				 * 
				 * 
				 * img.parentNode.appendChild(dimg);
				 */
			}
		}
	},

	purgeContactMenu : function() {
		var anchors = document.getElementsByTagName("a");
		for (var i = 0; i < anchors.length; i++) {
			var chkStr = anchors[i].getAttribute("href");
			if (chkStr != null && chkStr.match(/id\d+/)) {
				if (chkStr.match(/\?/)) {
					chkStr = chkStr.substring(0, chkStr.indexOf("?"));
				}
				var uid = chkStr.substring(chkStr.indexOf("/id") + 3);
				if (uid != MigScript.myUid
						&& anchors[i].getElementsByTagName("img").length == 0) {
					MigScript.UI.Menu.addMenu(anchors[i], uid);
				}
			}
		}
	},

	addContactMenu : function(event, elem, chkStr) {
		if (chkStr.match(/id\d+/)) {
			if (chkStr.match(/\?/)) {
				chkStr = chkStr.substring(0, chkStr.indexOf("?"));
			}
			if (chkStr.match(/\#./)) {
				return;
			}
			if (chkStr.match(/\#/)) {
				chkStr = chkStr.substring(0, chkStr.indexOf("#"));
			}
			var uid = chkStr.substring(chkStr.indexOf("/id") + 3);
			if (uid != MigScript.myUid) {
				MigScript.UI.Menu.addMenu(elem, uid);
				MigScript.UI.Menu.showMenu(uid, elem, event);
			}
		}
	},

	togglePlusBtn : function(id) {
		var btn = MigScript.DomUtil.ge(id);
		if (btn) {
			if (btn.innerHTML == "[-]") {
				btn.innerHTML = "[+]";
				btn.title = "Развернуть";
			} else {
				btn.innerHTML = "[-]";
				btn.title = "Свернуть";
			}
		}
	},

	showHelloMsg : function() {
		var hello = MigScript.Util.deserialize("hello", false);
		if (!hello) {
			MigScript.UI.getOpaqueBg();
			MigScript.UI.Dialog.getDialog("<center>Новости MigScript</center>");
			MigScript.DomUtil.ge("dlg_body").style.overflow = "auto";
			MigScript.DomUtil.ge("dlg_body").style.minHeight = "100px";
			MigScript.DomUtil.ge("dlg_body").style.maxHeight = "300px";
			MigScript.UI.Dialog.showBlock(MigScript.helloMsg);

			var fok_btn = MigScript.DomUtil.dc("div");
			fok_btn.id = "hello_wr_btn";
			fok_btn.className = "box_button";
			fok_btn.innerHTML = "Написать автору";
			MigScript.DomUtil.ge("dlg_ok_btn").appendChild(fok_btn);

			fok_btn.addEventListener("click", function() {
				window.location.href = "http://vkontakte.ru/mail.php?act=write&to=4518704";
			}, true);

			MigScript.Util.serialize("hello", true);
			MigScript.Util.serialize("warcherPool", null);
			MigScript.Statistics.ping();
		}
	},

	showAvatar : function(uid, x, dx, y, containerWidth, list) {
		var div = MigScript.UI.createAvatarBox(uid, list);
		clearTimeout(eval(div.getAttribute("timer")));

		div.style.opacity = "1";
		if (x < 150) {
			div.style.left = x + containerWidth + "px";
		} else {
			div.style.left = x - dx + "px";
		}
		div.style.top = y + "px";

		div.style.display = "block";
	},

	hideAvatar : function(uid) {
		var div = MigScript.DomUtil.ge("abox_" + uid);
		MigScript.UI.animateHide(div);
	},

	createAvatarBox : function(uid, list) {
		var div = MigScript.DomUtil.ge("abox_" + uid);
		if (!div) {
			div = MigScript.DomUtil.dc("div");
			div.style.width = "100px";
			div.style.maxHeight = "200px";
			div.id = "abox_" + uid;
			div.style.position = "absolute";

			div.style.zIndex = "3000";

			var img = MigScript.DomUtil.dc("img");
			var user;
			if (!list) {
				for (var i = 0; i < MigScript.Friends.friendList.length; i++) {
					if (uid == MigScript.Friends.friendList[i][0]) {
						user = MigScript.Friends.friendList[i];
						break;
					}
				}
				img.src = user[2];
			} else {
				for (i = 0; i < list.length; i++) {
					if (uid == list[i][0]) {
						user = list[i];
						break;
					}
				}
				img.src = user[2];

			}
			img.style.border = "1px solid #B1BDD6";
			div.appendChild(img);
			document.body.appendChild(div);
		}
		return div;
	},

	animateHide : function(element, onHide) {
		if (element != null) {
			if (MigScript.Settings.local_settings[39]) {
				var timer = setTimeout(function() {
							fadeout(0);
						}, 20);
				element.setAttribute("timer", uneval(timer));
			} else {
				element.style.display = "none";
				if (onHide) {
					onHide();
				}
			}
		}

		function fadeout(mod) {
			if (element.style.opacity == 0 && element.style.opacity != "") {
				element.style.display = "none";
				if (onHide) {
					onHide();
				}
			} else {
				element.style.opacity = (1 - 0.1 * mod);
				timer = setTimeout(function() {
							fadeout(++mod);
						}, 20);
				element.setAttribute("timer", uneval(timer));
			}
		}
	}
};
/*
 * MigScript.UI.MultiPanel = { panel : null, createPanel : function() { }, init :
 * function() { MigScript.UI.MultiPanel.createPanel(); MigScript.log("Panel
 * inited"); } };
 */

MigScript.UI.Images = {

	noDataImg : function() {
		return "http://vkontakte.ru/images/question_b.gif";
	},

	loaderImg : function() {
		return "http://vkontakte.ru/images/upload.gif";
	},

	mailImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAK0SURBVHjapJLPihxlFMV%2F35%2Bumu6q7p6Z7slMCIkSBpUg7gQDQt7AhUSfwJ3gO%2BQJXOcFApqdKxeKKOIuhIgOIc4fxnGIPT39p7p6uuqrr%2Bq7Ljroxl0OHO7ZnMM9l6tEhNeB5jVhnz%2F69P3t9z75PGr3WiidCgghaHSrUdpIqJ0VESUSRBuLK1bh5ODJjzcG0ff%2B4ulvavTs68et%2FY%2Fvt2PFhtH8XyH1as7yJbPLGX%2BdjSl8wZ3bw6%2B0QYd%2BrMknY7LFDKgJUv1LRYNzBSdHR2SjC3b7m7QIfPftN%2Fz%2B4vQjW%2Fs6BCdsp32yfMG0mLK1vYVSCiWK8XjMZDJhuL1DmqSsnKMoS7IsYzadFLapfe1KhxJHr5MwmU758%2FiUbq%2FL6O8RrSjm5o2bND6wyle4psa5CqUUWmus92VRuhKjGvI8p%2FSepNNlkS3ppn2CBFbLAmmEOjSUvqZyHgBjNLqp69r7hkW2YJ4vieKYEALJRkpkY6SBl6MRq8pRVJ7KeZyrXgVYbGjqer7I8UVOb3OTqvTruwuICKIVthVxOZ2Qdro45ymrdQWjNXa5uDzK9IydrYSyWCcLsjaLIAIKDUFxMR7TbidUlQcEbQy2I%2BNHmQ0Pfvj5p77Vln63R5KktNsdoijCGIvWGqUUVR24ms5omgAojNFYfXU8vvWufXy2M%2Fzs5PA5p%2BfH%2BGq9iTURcdymvZGQdLokSZemgT8OX6BUQGujbLUcE%2F%2F65Rf33r7%2F5IM79z4sQ7S%2FLOXW4qoYZtmiNZ9Nmc%2BnXM7POXu5wlc1y2XGYDCgt7mNOnh4F2kqFIKJU3TcxyTX%2Bqazt6s6e29I%2B%2FpbdWvwTqU6%2Bytvbucrv3d1VfTSbq98c9A8UAcP7%2F739BJAAiLNWiMopdF2Ax2lmM4w0u1rA53sXqd2i%2BL8l8N%2FBgBQbXgCU4xqbAAAAABJRU5ErkJggg%3D%3D";
	},

	wrenchImg : function() {
		return "data:image/gif;base64,R0lGODlhIAAgAMQfAClop5m50YzK6V%2BKrQ1Qhtjr9unz%2BvP3%2BqfV7VCTzM%2Fc50V4oMTh8rPZ7maTxK%2FF2XzB5XWiyeHv%2BKPK5Fe04rTM5SZilr3c72%2B%2B5dHj8H%2BhvcDR39%2Fo8EF8vQBFfP%2F%2F%2FyH5BAEAAB8ALAAAAAAgACAAAAX%2F4CeKymIO26iubPtplqYtnuPerkZUx6EQA5xwpOvwfJ7AsFV6fA4WQuRgOMCWrIUl%2BRsYvoaNB7tKRjxAsERy8CjIo2QjsiisJfaM5wAXeSIMDQ0FhIUMQH0fWhIXDRcZhBlrE4hwDgQOEoGCggwIEg%2BVWBwEFgkPkhkTgw0CEpRBZAEeFh22thMMBggCBQGiS6EEpRYAHbkGrb7AQwYBJjTGyLzLsYmzxhe6yr%2FWfdgdBQwF1N0KGxzfHgAOBdrlBB7yMXDY7YK8F6sSHAEWFnyw2CvACUEDBAgvGLCwoN66TAgjTkCwipQSWQ8l8BLAsSODAQ0dAlAgoSPHBBB8W1m45sEOhJcQEhirMCsRBw8VDLzEkKADGltj%2BrSZAoEnAA8DokRJ9IEAAIIUEnhoCAUp0wEEOjAQQMGnkwMpmJKq5SAmAQ1MV%2FxwautsWrU00CR5y4LDhrssQgAAOw%3D%3D";
	},

	warningImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM%2FrhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB15JREFUeNrMmWtsHNUVx%2F%2Bz6921HeNHYsdJnBDsgPMyedVpIG4ckkAcRFJeMSQhgTxKadJCW0GFVKklokkAixQkVL5RVS2tEM8PqdQPDcgR4iEhnoIkSCBeIZDGcfyYndndedz%2Bz%2BxdZ3dt1%2BsQao%2F0094dz879zznnnnPu2FBKYTwfxgW813JyI3HIi%2BQDPR4XFriEvEB6SDd5jjSR4vEgrowcrywNq3val6o7r2lQUSOw2ttkJomOtcD94sbDj%2B9Uyvtcqfh76skd85V27QFSS8JjJU4sZG5dMUOpb48o1XVMqZ5Plfv%2BU2p5nSECT5MV2spjcrxUEYM6%2Ba8Hler%2BSKmv31LqJOk9pl7ruE4ZaSu%2BqGM0cj4ThL6DuNXkhvvamzG1eRUQ5%2FrwEoBLzF4s37gTmxaXynXryTJtxVFnjfONDXmwZ2dOjEz728FfI1pZx4Ri0V4ecQE%2FSTnVWFgVx58PfRB2FKbz%2Bn%2BTfuL9PwT%2Bguz6y71r0bRyA45%2FEceZfgddA7jo6k6gce6lCH3ZiZePx0Xg5%2BRjYo8mN55Poq4mR9c0Tao5%2FI8%2F4Kw7Gf886sDIupPSJr5pIV18ohMLNj2GT3pwQkKCHCPW9xmDv%2BOPajr2rANKKmEke%2BEkLSQTFlIZbAteyoKyu1Ayawn2bZkjvxMr7iITR%2BO50QqcTe7ava4BS370Q6DvLEJuHLYVRzx%2BDpMkE3GE%2BTeYFm5pX4%2FWmYGJbyPzyITvS%2BATNWVFsQd%2BspaLgo5M9SHsUYxNYWauyBTPGQ4F2t0wKurw%2BE%2BbETFQznvcq8MkcqEFbiDX%2FLb9ctTUz6BlzlJg2koOrdWfJVDGIjCwoIjs78Hi1lbsvCJIO1eTlaS8kDVQqECppx3z6iZgd%2FsVnJCTpsxAYMQzmfpMijJhamScsk2630xfxziFH8ED25aipiSY81dkMoldKIF7yJzHdi1F7CKGj80JnfTkYXewQLPfpFVNuljEaZH93ZjaeBn2bpgk91tANpGKkTQUInAq2bt%2BSS3WtjZyYfSm3SaJWT7pRo%2BWNLNdTPwk%2F%2BZpFwcwR9sp7Fq%2FAE01wX1%2FRhpIyXcVuC8aNio67lhEMW7aGjJhSsOxSuXFYH9W%2FKWysHoQq6zEwzdLgxO4WESKSYuGm7xoBHFUhdt3t9Vj7hw%2Bdn8fY8nReOnSFlYUyDVD3Z5elxa%2FF%2FkcuLqnzj68EK5rqceGztM4dNzfqJtbugV9Q1WYkQT%2BsW5icdGDm5m64uJSVinf1QJdXXsVY43aKdDXranJUhz1hhEYLLkwHm2fgsMPnSy1XdwnDa8uganRuFiCeNXejY0or%2BTMDPqgU3G1UIHVQr4bJG5ZsDQyjihLXzsElonGS6uw58rA5K2kTaedUKEWlIS1f9HMcmxfMyNtHofiPD6gTzxtQSGkEKU7GXpMK9rFtGDE09ZzhpnBD%2BH%2BdZV4%2Bp3Txqk47uaZIySuLTmiBX8pK%2BzRrXNQJDOJtaTX82xtRcEeYIJhw7ZziSo755pBsGbXVMewry2SKaFbSGV%2BnR5KYD25f3NLHdY0c4GZki5oEjeLTGOqKQsnYCcSSGRRjNxrBkORVgI7WkqwbHow712kMT%2FtDCXwQGksXLHvlllMssm0W0WglzV2c8%2BXhZMMrST7gjQpEkXmuv9BKoFwkcKBtiDSpMv5eX6dzo9B1jHcenfbJWi4mGHY26eFOJqk%2FszEoRPEYC13v3Vs6CP6tg4%2Fq2N6Fbsj5AmumdVzDdzIRPHSUfyYZ57RaUf22Cq%2FWL9WP7l0%2BbsdLaiIOFBJS7sjGXwaA1Y8J5BZEDaHZl6CKOPCL4kU0hEz9RUZ%2BPQ%2FCov%2FxPWYxKu6b%2FxC0k62BbfL64v9t85GRVUxVE8SviRbXwW5LsDPxeC5EBP17c8Db36VO%2B1K7uP%2BzkTluQW0VGzdZk0D7rmSqaMz2KbKRutpciYjUIr2Qy2zq7BpNbe6dgIujRu8V%2FJzUVlj2flGaaJTzEJf9%2BVOeiqeNo7rF7Dv4D2i9MBvmBH%2F%2Bi7wVW%2BQdl6RnC%2BL5CIi2XzKI7fNh8FAkpLrMrt4vLmnJxGkRw2%2Bq%2FTY0edDQ%2FgxbKQfximAFOdyGSYVTNW%2FXzWQSbaRKhF4Pdm5bUUdWpov5j7CRdI7JyQjbkDkEN8TQ7hRzuVfOxxynSX3YIjvaAaWTh9okGvFxT%2BQlmrNZRwWR5HopXuZ5ZWsH59u1gRjzwjKL3SfELicD7FwymArNtVqkQXuglO8T4TmKqE%2FG6qAt04EaadaBL5Bbn7qlS9nXLXwKGonVSPkW0EyVrIBZ6uiIKuVsxmCz7XPtRtKNx6yXg5ei5xtZ%2Ba8WCdcYEss5UO89irbhiOfBafOIB3iQQzeSQ5WM4c31upKk%2FPmVeV8DLXvNgYnj9G9STXS1v7wFN3tBG8fniCHDF1NynUt3CqLRZ%2B7kG9fCz1kzXeRTvK6tGFGloXFksxGqNH1MISxOXz95oG2xDdGXl2O6de2kTGyYCY6nOEa2PH3ln%2B8%2FxvivwIMADlRM6flJ8gyAAAAAElFTkSuQmCC";
	},

	checkedImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAANNSURBVDjLbZNtTBR0AMb%2FXuuDW6vNhKkEk0VFvCuOOxjcwcG9yMXJhAgmQkAXMGOSwZlkY4uClrYxCscBGzPeRNHBQOQODDiRjPS4gBZiIIOtJCGxMOB4%2BfWhNhfjw7Pny%2FP8Pj2PAMRmCSHcxXahFq4iQfhLknYq9%2BoyUt7z2DK7qfiiCBE5z%2BVu75RVec5HXPBD0ehDUJXnnPtpN0uwUZ630u9w3RIgXhJ%2B4qho0TVJOfNLJtWLRqodH%2FL10gd8%2FjCTrNFopPWvISsOtnRazPL%2FAYRE7N6Wts2cclVF63ox5xwnKfwji%2FdnUsmZTiZxRENyfwzx15QEnH8ZTZn2u9WFNf%2BnAJUo1DcF07pRwpcrJ%2FjiyXGKHh3jk4VjHBnWkt6ezN1f72G7bydpUI1vrTsFTR%2FXAM8K4SRcdhpfsJVN51C5UcBXG%2FmUreVzdjmXrInD5HUfZ2lpGYAKq4noGwo0twNRmSKnfpu7HyaEv9CrGwJXah2nKZhNI8eeRNGjLE7Np5Dd%2FTaPH%2F8FQOVAJbLmfei%2BjyJuLJL9dV6rXT%2B2GoVEKwxxHaFUOPLI7krHPjFMbm8m%2Bi4FdyZtAJh%2FMhN02Y%2B4IS2aPiXx41r2NjpzxVZXLnbES7IPdQRTuphL%2BY1zAIxMj1LSVQLA9Nw0MS0aEkd1xA6qieqRox9TsadhB%2B3DF6uFZ9quJFXT%2FrXieQOplrf4feEhAGz8a6fMRiKtUhKGookeUBLRE4pyJITX6zzWb09az4g3DVrvV4vdxj%2BaOUL8kJL8zjwcjlUAhqbsqFrkxN5Rob%2BlIqpXTuTNMLz63dGdP%2Fjn4t%2FziQIQPicDKrRtByhaNCC9HEDfuBWAz6xFBJm9if1Bg8oaTqglhPAxKS61TlT0mGyAswDEtSvmQJ8i71H9dSlpU1qM356g3daB4kIo2oEIovoUKG%2FKCf9ZhsslZwwNhsWV5ZXUp1MWiPJmU4LsrOyuvM2XiF5fFN37iLErOTx%2BkKjhUHxveeDasIuM%2BoylmdmZQkCy%2BUySBxMPIt%2BpebctvCps9sAlLzyad%2BN20Qmv%2BlfQ1qiflHaV2oB04Jkt3%2Fifnr83MflGhbn607LO8m9M16saWwfbytaW1pOBPZvz%2FwA7GoOmYElPgQAAAABJRU5ErkJggg%3D%3D";
	},

	uncheckedImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAAKSSURBVDjLdVPdS5NhFH8vo5ugP6OglXod4V0YiXST6UVGwbxpoAy6qAvBi5ANd9fFtoSNfShzkzllw%2Fk9dV%2B6Md2X7ktttGqRcwsbMk7P79CiyXrg4X3e5z2%2F3%2Fmd8zuvRETS1d1zv6dT%2FlT%2BTPlC%2BXJMMSafeDsxNP5mvKtdbMtLR0fHrdHR0SmtVvttcXGRlpeXyev1ktPpJL1e%2F2VyctJgs9k62xL09%2Fc%2FVqlU%2BbW1NcpkMnRycsI7n8%2FzezQaZSKdTvdJPAdaCGQy2W21Wp3z%2B%2F1UKpWoUCjQ0dERJRIJ3tvb27Szs0NbW1vkcrnIaDQWxf2DvwQjIyNTyAwwMjazYoM0HA7TxcUFnZ2dUSgUIofDQXNzc26BvS51d3ffE7K%2BZ7NZOj09ZfDx8TE%2Fd3d3aX9%2Fn5rr4OCAVYDUYrH8TCXjD6Xe3t4BNKxYLHIAak2n0ywdBI1Gg8GRSIQ8Hg%2BDcZ6ZmaFQMPBOGhwcfIVuIyvk1Wo1DkBJlUqFwblcjsH47vP5aG9vj%2Bx2O8VisQ%2FS8PCwfGlpiSWnUikGVKtVVoGFuldXV1kNsm9ubvJ5dnYWKnWSUqkcgj1oGNjPz8%2Fp3xUMBhmEJ9xons1mMx0ept9LCoXirmji53g8zhKR5fLyksFwZWVlhQKBANsIMEigSAxUvVz%2B2sc2ajSaj%2FAXTqAcuIGFhoKgKX1jY4Ozm0wm3IVFyA0mEA25I8Y363a72TY0CYOExsE2lAYSKJyensYw%2FarX630to7ywsNBnMBjyGBJkXV9f52ZBBYC4Q2YRVxOWv277M4kSuubn501Wq7UEn9FpUSs3TJx%2FCPleEffov3%2Fjn30tmUw%2BEaWoRRlWMQN2Qawtl8vPxbebV%2BN%2FA5MhHsP9PufLAAAAAElFTkSuQmCC";
	},

	deleteImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAAMnSURBVDjLbZN5SNNhGMdfDQKDouiPSPunhBDFijTyKGe7ymPTpjvydhoG80icTIVKK4yKNI8OqMgsKrFDyH%2FKA5VW5jEz05mWaZtr6ly20qlzv2%2B%2FjRplfuHheeB9Pt%2Fn5T0IALI8aLltJ4S1jxAhjzgfiXfdwksViL1W7F0GrpUQIi3bvL7uxSG%2FCaWIDaWQhaawwJn7vp5tV%2FYFnKpt79y%2BooEbIVtPrnauao4ItmgvZFPzV%2FOsC5ezrXPFadRcUbJVr4i1vIlmWGqC%2FJSN1Xd5NOPkMKC1rtDF%2Be6rBN6CqbrYOnM%2BkxqXx1NjBceo8TNZlFaeRE0mcWFWCNGXGIKnB5nqYZ2e4TAQE5LSKmBazA8uLhnPSDGv7oaxPA96hQC63MOYKM3FXH8nNAVx%2BCkLhUrCRlNW%2BjOa3UDWEOJa7rqxfqoiH98Kj1ILahVssppnYShXYLJMYa9tmu3vwhhvN77JwtEQwTFOve2OJNsIYT8P9Z%2BgbhdiPEMCY2W%2BA7Dlv2tdSS4MId4wiPeiM5qJwRuVJYRBiEgp4QA386GViaE5EoyveWmw%2FvyBP7LVn3NSoI4MhDFkByYjdqM3MgADpcVPCN9pVYxSzAYqj0ObLsRIuB%2B02Sn%2FGXzKSEIfywfGUG9Mhu9Eb4Q%2FBisu1pP4TW68Rv7%2BaVxKh0YmgOa41AHb8p96ic7DskQYwugd8HehOzoYow%2Br75BkcYzHPV%2BvtunTqfiSJsCPDqUDHslMsk9e%2Bm0y0%2F4SI2xPGBOC0CIOt5iGBjJs9%2Bh0hRF04rWISc2eSsRQNMtuYgP7ub54z%2FGxT7bB7%2Fj0%2BUj80CdioKv47Ajt6Wl%2FB4963rrXMALbeqSh%2BJ4TRen4vtAc8oaG5QFNMB1MD3zkeEEnCcSHRA5apHFL5pnv8n%2BecnPtY05dGFfVEcOGQS7AXCoTizH%2BWBTtgYmeqk9mold8gGpJSbDoVaoKmlnz32caNS%2Fubc6VP2iICtO2S7hQCfdDFRWAN0ImWmMPm7vPn1NbFi3ZdK%2FLir%2Fxd7jotRPcnhu3ilRl5VW9168%2FHKypvWbS6dPoNffl%2Fb8AbV2poGDi82sAAAAASUVORK5CYII%3D";
	},

	photoImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAAnYAAAJ2AHHoLmtAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAAlpJREFUeNrEkz1rFFEUhp975%2B7MbmaWRUk22ZCoaZIQtkn8wCYYLCzEKulSKAFrG0G0EiwE%2F4aFtaUWdoKNAZsQDNmwJGI2WdaNmc183Zl7rXbB2sIXDpzmnPPyvBxhreVfJPlHqdXV1Rtra2sbvu8%2F6Ha77YuLiw%2BNRmNQFAWO48yur68%2FVUqVKpUKxhiiKCbREEVx9urli9dqa2vrzebm5pq1VmZZ1kzT9H6apiaOYwBncnJSKKXIsozBYIDvO3xreyRx4k%2FPXL2pxsfHL5fLZTlkYYyRWmsphKBeryOlpNfroZTCc13C8BezNQvVnM%2FCoM7OzuzOzg5hGKK1Js9zsixjeXmZNE3Z3v7K4eEhnusxv7DAxMQ4dS5QqgTWoKIo4ujoiDAMyfOcPM8JgoBqtcrp6Qlv373n%2BKyMzH7y%2BGEJ13VRSoGQCCGQ1lqG9q21GGMIggClFL%2F7fT59%2BcGl289oDa5w0NojSRL6%2FT7tdpvBYIAqimJ0WWtNURREUUSaptTrde7dXSKo7HFrqUxjegZrLa1Wi1arxcnJCcoYQ1EUGGMY9r1ej263SxAEPH%2FyiO97e4hr1xkb89Fa0%2B%2F3cRwHKSVyOJjn%2BWhRGIbs7u4SRRGeV2ZxYZGpqQaVSoXj42POz8%2Bx1iKEQDmOI0qlEp7nIaWkKAqstRwcHKC1Zm5ujiRJMMbQ6XTodDpUq1WstbiuK1StVotXVlaIomjEIsuyUaRxHI%2Fc1Wo1fN%2FHGEOSJLium4lms7kxPz9%2FxxgjjDFYa%2F9iMqxhWsOktNZmf3%2F%2Fo%2Fjv3%2FhnANszeTkfe3n5AAAAAElFTkSuQmCC";
	},

	albumImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2%2BoZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjA4ZXKc4QAAAXFJREFUOE%2Blk0tLAmEYhb%2F%2BVCQtpEVUEiRG0IVKpEVIESERhQRhF1yEkem0amNElCRWZlZSFppmQgOappsW%2FQI3Lk%2BeT4aiILwMnDnfgfc87wzMtAEQvNzevdqh0YsAyrnlQrlcbkjsiB2PgmbEZatrG81vJmDJvgJBCsP2rrcuaZvp87YFCFIYHJtOqMVP3GVKOI%2FncXirwhdRpR9FVZzcZ%2BWMtpk%2BbZ2BIIVhcdkuAT%2BVyn4gGH%2BTukjk5Yy2mW62TEGQwmCdnYM%2FlkXgIVcrVJ8ilCjgKvmOm%2Bcioi8lOaNtpg%2BPjEGQwjBhtiD0VEC4qutUtZAuydchSDlLI%2FCYw%2FikGZVKRTo7A0YTBCkMpsEhWTiIvEIJpuA%2BTWLdF4NNiUjtX2bkDAF0dnp6DRCkMHT3GWHzhDHq8P8RAa7juJwhwGDo%2FwaQQoBO11mXCGCHrtd3QfD23yfMwd9ip729Q0poh0Zd%2B4fkj9SKWipz8RcCHcTJMjvT%2FAAAAABJRU5ErkJggg%3D%3D";
	},
	videoImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2%2BoZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjA4ZXKc4QAAAn9JREFUOE%2BlUu9PklEUfvujXF9cH2pt5lrp%2Brk2S1dzRJhzTs3m1GJYgghSoiIgv14BURH5oYHYDLE2F%2BXWMBFHbIli0jLz89M9d4NJXzvb8977nvM855577jkDQPgvowSnsbIah8UuQqcfLQP5KPYvvyROpdNcsPb%2BA34dHRGxZPRPfpVmiHOIW0zEE2ylUlBrddjP55HNZjE0pIN7yoPMtyzH990c%2Fpyc8DjxFC%2BVIA2%2FPn36%2BlXY29vHbi6H9iedMFps6JUrMGGxYswwjoeyJtTdrUci8Ynzup%2FJQRqewB8IIRJdxu%2FjY7xdeQeH0w3vvB8uzwz0I2NQDgzCyfZWxyR6mZB4xO942gXSCnJFHwqFn9jJZJDc%2FAqb6IQvGIKJVRGJRplQRJgJKKnBaOI84re0toG0grSpmTfLYrPjkewx6hvuQ3S6sP4xgS%2FJTcTia5j1%2BSG63Eh83uA%2BMtIRhAeNEu7oH1BDdE%2FBbHOgq7uHEZMlmCcsaO%2FoRE%2Fvc%2B4jIx1BqLvXwB1mqw0LkSX4AkGo2XPRSQTqi2pQA6s4Ce2rYbweHuF80hEEGSsjf3DAS532%2BuBkz2cYN0EilaFRIkUbO1l0TcG%2FsMgba7HaOf%2Fm7TsgrWAyTcDJ7kzd3dxKcehHDfDMzsHB7t3c0oo5f4C9xDSv8sdhAUaTGTW110BaPgfXb9xCOr2DQ9bdFFs9M168WVpGKBzBC6WK%2BwgUJ96l6ssgTWmQ4qz8K1drsL29zScuw6YxuBjG3HwA62x4ipNIceKdv3ARpCkloE0stoqqqmpWlhk5NpGnjf61bIQrK89xDnFJU5ag6BjUaNkptaioOFsG8lGsyCuufwF6btSv9VNqMQAAAABJRU5ErkJggg%3D%3D";
	},

	addImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAGnklEQVRYhc1Wa2xcRxX%2Bzszc3et9eP2MH7Wd1E1itw4xSQ1poeEhhaIioYSi8I%2BojlpRQhQpSEStVKEI9UdBAoNSQqP0R%2BX8qVARgUY86iIhUhqBk0aBbCOX2Js4fse73l17d%2B%2FdefHDrpX12o3bCpWRjnQ1cx7fmXPuN4estfgkF%2FtEo%2F8%2FABAfRvmHN3Y4KXVzt7HmayDbZQ3qAIAYZmEpzoj9oUZsPP%2BjTZflen3Senrg%2ByNtYc9kjxbnzdHMqKkpTAhUmVYEEQVnDnyaR5aNQTTkEWtjqUCU9bmssu9n7aO5jw3g0H%2Bq98i87r%2F9b91Uu7ANOzd9GRvrO8BZ6eVZazCWHMHgyBu4Hf4X6j%2FFJ50QP3Byy9ybHxnAd96NHS7M6r7s5aj46gO92FR%2F%2F90SAgAkZuL487VXENuxoCrq%2BNFTD2Re%2FNAAnroS%2B%2FbCtO431xvx%2BIOHEQnGypXeb2FTfpQtpPCbSyfgbJ1FpIEfON2dObNuAE9eivX4WX0%2Bf63KfXzHYYSCUQCACBECIcLw%2FCW4LAKjAasBowFPzqOzuQcyb1HMLfqcL8zht5dfRLRrwQtW8t0vP5i5uDJW2V%2Fw%2BsRxkr45kRqC%2B9j934IQDijsI1TDwR1aTLwAHOz4eYndL%2F75JERUQkSBoLLIpzSC2sUXO7%2BJgaFX3Prt5sTrE8c%2F9%2FXm4yUZl%2FHAa8N9%2B3LT9qGtdZ9BVaQG4SaFcIMGOUUY%2BDDwYVe7c%2Bjlc4giQhs0oi0a9dVNaK%2F%2BNHLT9qHXhvv2rbQqA6ClPijTDB3NOxFrtXAiGgayRFYruoWBQbFERIVCdavFtrZdkGkGLfXBDwTwxEBDRObtnubKzahrcSFcXebUoAgLvQYAWSYsoNHQFkZz5WbIvN3zxEBD5E67kh7wioVdyoN7X%2BsWhCsBQOKW9x6gA7AasNrCaMAopwyA8gjxa0MwalHPagCOxPbtnQiGgS0bt%2BDvN4Zcjwq7APxlVQBamnYyHPc0bYClRTZ1WQwHGl8uC7hy%2FeAL%2FWV7P33zILDkp7W5ETTCoKVpvxNASQm0RMR1wghHOAC1JB%2F9uS7aeXgmBQuJUIjBDYSgJUpKUALASPiME4TQi8hp9YZb79LwkTRXIZEGMYVAgMNI%2BGsCsNKO5bwsPJMESC3Kx7gBBgaHceTsOCQyKPh5WGnH7tQpJSLDL0pf2VkvQQ3hexGgCDxM4fTEN2AMoJWCVB7Ir8aRrl%2BXmP74b%2FuhndlldrQaMG4aARYDUERaJpBfkBaGl7BhCYDf9WYnHnspNDg5m%2FpsTTgCZVOoDwUAKFirlzgAmJjMlGdbkcF9nSuJtW7561YyiWLODv7x6exE6S2tWFbi1aHr0zDGQjACIwlGCpxZOEzAYQKMqBwAseXzlUJgeHdoElbi1TK7lRsuj55Kjvrjl2%2BOwGEOArxcGJVPcozYqroB7iA%2BdhNTidy4y6On7grg7KHpvPLo2avvTOHirSEIEggwp0TWBLBCzyEHVycTGPzHKJRHz549NJ1fabfmPPCl5yt%2BVdvBnt66rRafb%2B1GzA0vn10bn4RTbCt5jot8FN0dTcs6uWIBb49dRfzKFJJD5qW%2FPlf47mpx1hxK68LNR2bi441GJfel5HlsrmpBV207aisq0d3aivLfsxUAkPFziCcTeG9uFFNXfSSH9NkNsXuOrBXnA0ey753%2BCrty463nw014pnGnoGCMEHEq0BSqQ2UgDJcHQETwVBHzMo%2Bp%2FCwyxRz8jMXUO8rmJvFC96ZHnvvlUwNrstm6puLdz0QeNqR%2BUtXOHqm6lyHSzMB4qY7RwMKEQTphkB4xbzErjp1%2FYeHC3XyvCuDkyZM0ODhIw8PDLJPJUKFQoKLyWN2jsw9z1%2BwVLh51a2izcMkBAOVZ6aXsdeXhDe2x39%2F%2BU%2B3bjgha13VNVVWVbWlpMZ2dnXb%2F%2Fv22q6urHMCxY8fYwMAAn5mZEYVCwVFKCa21Y4wR1lphrRUAhLWWL31zHoQTakAlLJCfwbz2IQFoAJoxpgEoIpJEpIhIcc6lEEK5riurq6tVT0%2BP6u%2FvNyIejyMej1M6nWae5wmtNddai6XgzpIIa62DxaYVAIT2wbM3rbLWEmMsCMDB0hNqjFFExJYSZIwx0npxiPF932azWZNIJNiFCxdMSQnOnDlD586do0Qiwebm5lg%2Bn%2BfFYpEppbgxhhljOAAyxhAWOeR9SrQALBFZIjKMMcMYM5xzHQgE9FIpTFtbm9m7d6%2Fp7e1dDrquJvxfrv8CxXtXyeWMdPgAAAAASUVORK5CYII%3D";
	},

	visitImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADyElEQVR42rWV%2B2%2FbVBTHz72247zrrLREDRsJQmq7hZKJ%2FQEZaGhjbKI8OgFjpONXhMofgNb9BfuBP6CBsQevFYZAGwOc8QfQSktaTVrXtHRTmzSJm4db27HNuW5XmGAklbIjXT%2Fl7%2Bec7z33msD%2FxMAb3ybwlARCJEIIXuIgZBoPmdmvjivQRpD%2FehgfuXIaX30S6vJFA8EAuEQPWBaAadlQrdWhVm%2BAbjQzCDs7c%2Blo5lHi%2B969lngI0D%2F8tYQfyXsi3YlIXxgI54GqaoKqmYDaQCkFnuMA8FpVG1CprIKmqQw0mrtwJP%2BQ%2BMnrrHqZ%2FFNcEDh5aDCa8PhDsFLRobZugihwzBYne82wMHMTOI6C6BLxMQdqrQJqo6TYYA1nz7%2FsVBM%2FdSPBUV62bUvaBgy8%2Fg2KP50MhHphpbwBQb8IlKCopkFd1YByAlDeDYZJob6ug2E18T1WxItgNw2oKvfQRnMUTZ9m4sFQRKoq9zfnAMVTuyPdE7FYDKoNzNpFoVgswnKhDBu64%2FVNHM%2FzPJ%2F0erskt%2B8JMIFC09Kc6oQHkMp9hd13hfokHissF%2FKbgPjI5PyB%2FQNRQM%2BxLLgzNw%2FltUYaO%2BfjmcvHlL99vSah4hjHu874g2EQ3F6sZANYhwkcVrdRdyriBBc%2Bo1BiANaKPbsCU%2F39%2FZgRwMLiAhRLa59mLx376FHdET%2F1S4JQKgeCT0qiNwCGrTmCLk4E1gG6rYOIwNLKggMYfybad6Y3HIF6rQq523czs18eP9iqv59L%2FZagW16blAPd0rHDeCzQYi6BT%2FCiRYsIePPK5L6BZ1%2Fz%2BiWYm7sDSq1xEG3JtAKwGDp9c0xwec950C7NMnBeNsWZZT7BA7XSnwwwKb%2BQiCebNoGZ2dv5WxePxtoS%2F%2BB3pwJfV1givIAAfWuhE%2Bfs43ENrS4BGXzrO3loKJ5sNFS4m19Mz1x%2BdbQtcQ7Fg2GJCiI0wdgUp8QBMIabuqBSYICR72Wc4KS6rsHSvSW29MdbZ87JvkCvxKH4tijdyh5g2yaltMwAV889tXvPmK4bUFwttAQc%2BPAPux0LHwQZPHE1tSvUM2FTAdaUwtncxVfGdyLQErD3xA9R0e2Zd3m6oV5dRsCRzgLYYe%2FbP075Aj0JtVFO5y4cbjnJOwe881NKFP0TuqFO5744vL%2FjABbxk9fnCeWiuBeFcNtt62%2B1IwBuZCm8ncA9ZTR7%2FlC64wCnivd%2BlrGBleznh4YfE%2BBGFAFTOGLZz17qiE3%2F%2BunH3%2F81iasweSv94vhjAbDArTiKgHwnAH8BBxJ50q7e3HUAAAAASUVORK5CYIJkYXRhOmltYWdlL3BuZyyJUE5HDQoaCgAAAA1JSERSAAAAGAAAABgIBgAAAOB3PfgAAAPISURBVHjatZX7b9tUFMfPvbbjvOustEQNGwlCaruFkon9ARloaGNsojw6AWOk41eEyh%2BA1v0F%2B4E%2FoIGxB68VhkAbA5zxB9BKS1pNWte0dFObNImbh1vbsc25bleYYCSVsiNdP%2BXv55zvPfeawP%2FEwBvfJvCUBEIkQghe4iBkGg%2BZ2a%2BOK9BGkP96GB%2B5chpffRLq8kUDwQC4RA9YFoBp2VCt1aFWb4BuNDMIOztz6WjmUeL73r2WeAjQP%2Fy1hB%2FJeyLdiUhfGAjngapqgqqZgNpAKQWe4wDwWlUbUKmsgqapDDSau3Ak%2F5D4yeusepn8U1wQOHloMJrw%2BEOwUtGhtm6CKHDMFid7zbAwcxM4joLoEvExB2qtAmqjpNhgDWfPv%2BxUEz91I8FRXrZtS9oGDLz%2BDYo%2FnQyEemGlvAFBvwiUoKimQV3VgHICUN4Nhkmhvq6DYTXxPVbEi2A3Dagq99BGcxRNn2biwVBEqir3N%2BcAxVO7I90TsVgMqg3M2kWhWCzCcqEMG7rj9U0cz%2FM8n%2FR6uyS37wkwgULT0pzqhAeQyn2F3XeF%2BiQeKywX8puA%2BMjk%2FIH9A1FAz7EsuDM3D%2BW1Rho75%2BOZy8eUv329JqHiGMe7zviDYRDcXqxkA1iHCRxWt1F3KuIEFz6jUGIA1oo9uwJT%2Ff39mBHAwuICFEtrn2YvHfvoUd0RP%2FVLglAqB4JPSqI3AIatOYIuTgTWAbqtg4jA0sqCAxh%2FJtp3pjccgXqtCrnbdzOzXx4%2F2Kq%2Fn0v9lqBbXpuUA93SscN4LNBiLoFP8KJFiwh488rkvoFnX%2FP6JZibuwNKrXEQbcm0ArAYOn1zTHB5z3nQLs0ycF42xZllPsEDtdKfDDApv5CIJ5s2gZnZ2%2FlbF4%2FG2hL%2F4HenAl9XWCK8gAB9a6ET5%2BzjcQ2tLgEZfOs7eWgonmw0VLibX0zPXH51tC1xDsWDYYkKIjTB2BSnxAEwhpu6oFJggJHvZZzgpLquwdK9Jbb0x1tnzsm%2BQK%2FEofi2KN3KHmDbJqW0zABXzz21e8%2BYrhtQXC20BBz48A%2B7HQsfBBk8cTW1K9QzYVMB1pTC2dzFV8Z3ItASsPfED1HR7Zl3ebqhXl1GwJHOAthh79s%2FTvkCPQm1UU7nLhxuOck7B7zzU0oU%2FRO6oU7nvji8v%2BMAFvGT1%2BcJ5aK4F4Vw223rb7UjAG5kKbydwD1lNHv%2BULrjAKeK936WsYGV7OeHhh8T4EYUAVM4YtnPXuqITf%2F66cff%2FzWJqzB5K%2F3i%2BGMBsMCtOIqAfCcAfwEHEnnSrt7cdQAAAABJRU5ErkJggg%3D%3D";
	},

	downloadImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAAVBJREFUeNqslDFuwjAUhj%2B%2FBGimSsxwkUrMHIMKBY5Au7QDU8sRIK1g7AkqZo5SZkQnIMRxFwelaQKJyjfFyvs%2FP9uJVe%2FpjRxaQPc2rgd7pTmqGICaETzjsJXQB5bAOhuUzFgBA8%2B4X0DwLSEHpYkxxBgOSrOVECAAPoCBzeQKm8ALMN2piBLcAVObaWaFCngARlRnZLMqLfTzZPNxn%2Fm4XzjOSH0AF2h5xj27zALJLzzjTHdKfwrQLblnZ9kpDdAVoMP16Egdp3ctW8M4PYmIr9beUcV%2FPux%2F47oIIbrSiaZr7p%2FfT881BAnRi3RxuuAS2doDeiHA6lJhGZllJcDyBpcq0rx31rEUYL0nGpYNFk1kHevklANgckl6puuJdZzWaoDX1I9eZU8nNmuy9%2BEGeASGjZw9LWBoM5uiG9sAswNRO7mOCvCBNjBLOkv4GQDQrXY73AXbEQAAAABJRU5ErkJggg%3D%3D";
	},

	// addMediaImg : function() {
	// return
	// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAAuxJREFUeNq01u1rW2UYBvBfspOTV9t1azsspFN0LThsYSjYoasidYh%2BFP04%2FxH%2FFMHP4ifxBR06V8UJwrCdDrrqVpta7driur4kzUriB5%2BkSZeUgu6Gw0nuPOe6n%2Be6z31dSVx6731doogLGMM4RjEQflvFHGYwi2mUOoFEHXIZPI2X8SqGw9XfsiaPQig4gj58g19ROaxAD17EW3gDg7pHf7jO4Xy4f4TvcL9TgcfwOt4N1OQcPQbxDh4POJ9hs7VAFi8F8PMHwZOJhEp1z3Z5919%2BsmmZOFKr11uX5cKzAvgVlBsFnsTbmAzF2mK7UnVmeNALzz4Ffrjxm%2FnFu7LplA4UT2IFC7gZhbflFUx1AoedctUTQ%2F3evDAG%2FlrfMDO31KlAg40p%2FIjNKPD9Goa6EZxMJlQf7DW%2FVx%2FsSSYTh%2FVkKGDeS4b3vOj%2FjyLGojBEp1sbul3ZVdnd3%2FH6xlazwbBd3rW%2BsdU%2BPOlIPpNubfxpjEdhQvsa2Up1z5nhU4YGjjcf3trZNTayf8ixkaJ6nUIu3cwtr95ze2lNnDrWSPVhNArTmNgHq5g8N2pq4pmuZ784cdbFibNtucvXbpq9teREb76RSmAg6RFHFIQr1zhFIZdx9fqc%2BdJKG0Xjo8Xmrr%2B49ouZudJDFBVymVbsOlajoIo9OAGZODK%2FuOLG%2FB9tTU4kNAvM3ir5%2BOpPTvYWDmvy35iLguQONgrU6nXZdCybjtuOms%2Bm2z6f7C3o62mXqwPS8TtmkkHPS4%2BA%2FhJmo2AWx%2FFct2mu1eri1L7wxqlIrVY%2FDHwZX2I6CpWu4PkgeA%2FpUS4bW1he88n0LFhYXpPLxt3Ay7gcMEuNbd3BhzgVJLenjf9M7PbSWrPx%2BWxaPhMf5Fwwmu8D1p1WPyjj22AWDhpOrV4Xp46JU7luDYWdAP5BwCofdLRNfB7ufx7BMlvjLj5tsczNbp58H19jEdcPMX1YC%2BsW8dVRTV9Y8DM2wrD8p78t%2FwwAaRXwvcI9WroAAAAASUVORK5CYII%3D";
	// },

	bookmarkAddImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAAZdJREFUeNqkkz1rVEEUhp9ZZm%2FM1fgBG8QoSApBwSCYrIaQKr2CrY2ggqV%2FwNI%2FYKeSSGoLC3srSWE2CoIQsd4ENPFjdzHOu7t3joVmZe%2FdXYuc6gzPmfeceYfjzIyDhF%2BvbVht492vIXy8OneZl08eOzPDGTx8ttIv8Gb97d61GzfTJBkr3G63xYvnq%2FX9Kc3Bg9t3gFgxc7sQ8VLYTJKx2W%2FNTkFgIi2jED4dOXf%2BVQ4tASwuLuBbreZrYDa0Y0Gg7B237t5fGvQ2KbC6%2FGjLS7oHoE7RTDW67Da6A82ZPnUISS2voPGpSsLxtFh44XAKwObPvQJL0wQFNb0UOkA5y7KhXzWMSaHiJX0EZrLsnweXThzrK7x4dAKA998bOQHhQwh%2BVJdRk4QQPnhJZ%2FOw9nkHgOrJyb5zvoekGS%2BF9H8TjPBguiTpT1GMZDHydHmll6%2FVt1mrbw9kPQ8UAgBnTk8B8HXnSy%2FPR54pBNyVq%2FMHWkd%2FvTrnAMwMM0ut5FIzo2R0o%2BOHmeGcw0Ujun1TorO%2FG%2FZ7AKmH7reaPc2ZAAAAAElFTkSuQmCC";
	},
	bookmarkDelImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAAXxJREFUeNqkkz1PVEEUhp%2FZzF7gRhKLbQQTQ0FiQ8OHGkNFQ4WJrQ2JklDyByz9A3ZAwFBbWEhFYWUlH1YmGmptFA3sJnje3b1zLJQF7q7JEk4yyUnemXfeeSYnuDvXqbi7t%2B97%2Bx9%2F%2F0cfmpme5O3aanB3gsOLV5uXDT7sHpwuPH6SZ9lA1%2BlmU7x5vfX1LKUHeP70GZBq7uEIElGyz1k2MPWr3uoyGM6ryOzwxvjddyVpDmB29iGx0ai%2FB6asmboMqjGwuLQy1%2BttkrG18fJblLQMoFY3TJ20OTpp94QzdmsQSY0o09BILeNm3r4S%2FTzPkKkeJWsB1aIorvyFktWipC%2FARFGcMzidn%2B99685OyUBEM4sA%2FSQo7zGzT1HSnbIYt7f7MpA0ESXL%2B03Qg8FYRdJf95QoUmJ9Y7PTl9dFrcNAZgDcHh0B4OeP752%2BXGVNZoR79x9caxzjo5npAODuuHvulZC7OxWnnQLH7k4IgZCcFM5opuD%2FJuzPAJkd4x755XyQAAAAAElFTkSuQmCC";
	},

	IMImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAE7UlEQVRIidVVXYimZRm+rut53vlmxvn5xpF1l3J/TAlrlQyj6ChSFnODKBNBWtwDIRC3gyIi6GADN+qokIR+PDAIAmFt6ajE3MSkUtDFJGUctdnNXWedye+bb775Zr7vfe6rg3dmN4ui0254uN/3eW6u672v+73vB/h/N/63w6n3X4eZAwcxu/d6TLXbSCJEYFQCg/4Aaxf+iu6bf0F34cX/nWBsbhc++IUv4/rb7kRW+vSeKycPXTFR3TIa1teWiDZAwrHWalVLW8Ny5m+rvadMnXrjT6fx2q8exdprL/5ngpvu+zZu+MxdE7NjODFZ4VipI7+10kWnNwBAmAYA26ZLYGqyhWt2zSFnolg/f3t99I2LCy+f/+P37kfZ6F0mYK5w+w+fwNz8lffunmk9en5lDRf/vg4lIDEFCbGJRMBBh2xGKbUiAqNiz1zR4gfeN4+VtcGJXsnf+t3xo+gtvtQQ3PHTZzA/O/XQ9Hh17JWzyx5LCSnJpACYsNxEBgImzSYLFxcDsFnq2lv1iAf2XEUDT/U8fuuvH7gd6UP3fA3X3PSxYxOZx19/axXjVWZK2VKSJBI0UlPe5jVZtEiYlMCGEKIqJq6u9WO8ytdWrg9Mf/gTp3j4kWfHr25PDs4ud9waq0gKJIJMIg1bIUEIIAgQDtuyHaWE4EBBCRQoECgRMRqOtHf3HJbf7R3MQtzb7W+iqjIAhSSQIskgCdps4AGQYJiWoxQzJYQNoIAlRSCIRBI5xfl3upqZGr8/Vyl9ZGNzBCk7JUkQKAQpkQTJACAIgAMkwkE5OWAooql9QohN6iFJdV1jOKxvzoNR7SQBSQQUTIIAUtrOgIQcACBn2GZhRHJhCQUApARGpCBrsLFIStoYDkOinqcSEunUFEBMyYJ2zFSWlKUmQSdJYHIilRo9zcbLpE3KIgg9JwR+BhBuQrAtC5gaXZSILEESICEhAcTlOBH25aVLy0g5P5wIe88tn1pEqe+EhCRBoqVMJUFKlsQdQBMWSDf1pZsSeKdpY3ufKf9g7dzCL9Lqwhns/eThP0/MXjViqW8Vk0VRlJVkQVSS2WAZAB1hmIRhIBwmYdsOwBTBx/Lk1H1Pf/3zEAD85quH0Vl69TtjM3N3QNhscoQMiIIBiISA5l9qtNv2bjCaMzK1Jr7CVN395LFDcNRIO4Pujd8+hs3uyuLugx8/IVX7SNy83a7NVxtN8jYbZ5YoOw0yUjX2UDXVPnT26VO/f+b4l1C2Bv8+TXNrEp975FkkpZck3ggp0o74ETDwLsfGLyK8HvaSiTNI+cn+yoU/vHn6JF45+SOUzf57xnXeebjus0fx0aPfRBn0T9YuN8qCgqoJwLjolL+LUr7/wk8eRClDjPrr6C0vYX3xzL9eKe+9D/bt2YXbHj7NCwN8MYZbD1b0XCthcRzl1QnVz89664kZDF6fTQXdhRcw3Ogh5YwwkHNGMdDprkESSinodDoYDAbodDo4d+4c+MvHH88b/f6+EThPeELwbIJnaEwDJoC2gZkAqZQA7tQUBtAn2SNJAH0APZIdkl1Jy5KW8qiup1POd6GUg6SuDnu6RMxSqgAoIqalBjQMRKkhCRGB7f1eRISkEYDuNsmypJdJ/phHjhzB/v370W63kXPG/Pw8IiJL4jZBa4cAwCXgfyLY2iYwyXp1dRV1XV+S6B/jD35GLMphjAAAAABJRU5ErkJggg%3D%3D";
	},

	lyricsImg : function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAUCAMAAAD84U6VAAAAA3NCSVQICAjb4U%2FgAAAAtFBMVEX%2F%2F%2F9Ccp1Ccp0oVYIgTXpCcp1Ccp1Ccp1Ccp0oVYIgTXogTXpCcp1Ccp1Ccp1Abpo9bZk6apU3ZZIyYo0vXYopWYT%2F%2F%2F%2Fx9Pfl6%2FHk6vDi6O7V3ufM2eTH1ODF0d27ytmrvtCetMmUrcWMpb19mbN7l7J6lrBzlbZlh6hbgaRZfqJSe6FPeJ5Lc5hLc5lCcp1AbppKa5Q9bZk%2Fa5Q6apU3ZZIyYo0vXYopWYQoVYIiUXwgTXpUB5GUAAAAPHRSTlMAESIzM0RVZneImaq7zN3u7u7u7u7u%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BxhENAAAACXBIWXMAAC4YAAAuGAEqqicgAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M0BrLToAAAATNJREFUKJGVk2tXgzAMhuvdqWzibSLikKlTh7ZTaGn5%2F%2F%2FLNCkU2Dw7ez%2B04fA%2BbRICY7tq7%2BhiPAFdWoVheOV0TbpB3aIgGB2wk4BPhBA%2FVgWodJIoRaqqClZ41CMWCPF45zWPcculzKc2yN47Lx%2B01owPgCVuqZQzuydqK1BmdMXCrtOvjQBUgK%2FvKXtMKo0Qp%2FyfbPwCbm0M45wPgLw9MUG7B4xpANEBpMycHxIiYgjwLmCbGbl66PxKI%2FBqzEYAiA93Q1xtAwoC4rZl5F8HeO8GLIGgFfr%2FBwrfpM%2FUJaX7QL0OJDZ8Vt%2BUlG6BN%2FQ7gHsAE4p%2BlZpjZ1c9oAZg3AWKcokjt4AxLTCKu0BtgdOAu%2BluZrsda9cjTV%2BM%2FGds%2FzigMpDyTIN4wPrPD3f%2BQ%2F8AtnqCKw4kUw0AAAAASUVORK5CYII%3D";
	}

};

MigScript.UI.Dialog = {
	getDialog : function(title, noCancel, onDestroy) {
		var el = MigScript.DomUtil.ge("dlg_txt");
		if (el == null) {
			el = MigScript.DomUtil.dc("div");
			el.id = "dlg_txt";
			el.className = "popup_box_container message_box";
			el.style.width = "410px";
			el.style.position = "fixed";
			// el.style.top = document.documentElement.scrollTop + 100 + "px";
			el.style.top = "50px";
			el.style.marginLeft = "-215px";
			el.style.zIndex = "2000";
			document.body.appendChild(el);

			var div0 = MigScript.DomUtil.dc("div");
			div0.className = "box_layout";
			el.appendChild(div0);

			var div1 = MigScript.DomUtil.dc("div");
			div1.className = "box_title_wrap";
			div1.innerHTML = "<div class=\"box_title\">" + title + "</div>";
			div0.appendChild(div1);

			var div2 = MigScript.DomUtil.dc("div");
			div2.className = "box_body";
			div2.id = "dlg_body";
			div0.appendChild(div2);

			var div3 = MigScript.DomUtil.dc("div");
			div3.className = "box_controls";
			div3.id = "dlg_controls";
			div0.appendChild(div3);

			var div4 = MigScript.DomUtil.dc("div");
			div4.id = "dlg_c_btn";
			div4.className = "button_wrap button_no";
			div3.appendChild(div4);

			var div5 = MigScript.DomUtil.dc("div");
			div5.id = "dlg_ok_btn";
			div5.className = "button_wrap button_yes";
			div3.appendChild(div5);

			if (!noCancel) {
				var div6 = MigScript.DomUtil.dc("div");
				div6.className = "box_button";
				div6.innerHTML = "Отмена/Закрыть";
				div6.addEventListener("click", function() {
							MigScript.UI.Dialog.destroyDlg();
							if (onDestroy) {
								onDestroy();
							}
						}, false);
				div4.appendChild(div6);
			}
		}
		return el;
	},

	showTxt : function(txt) {
		MigScript.UI.Dialog.getDialog().style.display = "block";
		MigScript.DomUtil.removeChildNodes(MigScript.DomUtil.ge("dlg_body"));
		var text = document.createTextNode(txt);
		MigScript.DomUtil.ge("dlg_body").appendChild(text);
	},

	showBlock : function(obj) {
		MigScript.UI.Dialog.getDialog().style.display = "block";
		MigScript.DomUtil.ge("dlg_body").innerHTML = obj;
	},

	showImg : function(img, label) {
		MigScript.UI.Dialog.getDialog().style.display = "inherit";
		var div = MigScript.DomUtil.ge("dlg_body");
		MigScript.DomUtil.removeChildNodes(div);
		div.appendChild(img);
		if (label != null) {
			var text = document.createTextNode(label);
			var c = MigScript.DomUtil.dc("center");
			c.appendChild(text);
			div.appendChild(c);
		}

	},

	destroyDlg : function() {
		MigScript.DomUtil.hide("container");
		var el = MigScript.DomUtil.ge("container");
		if (el != null) {
			MigScript.DomUtil.removeChildNodes(el);
		}
		MigScript.DomUtil.hide("dlg_txt");
		el = MigScript.DomUtil.ge("dlg_txt");
		if (el != null) {
			MigScript.DomUtil.removeChildNodes(el);
			el.parentNode.removeChild(el);
		}
		MigScript.DomUtil.hide("hider");
		MigScript.DomUtil.removeChildNodes(MigScript.DomUtil.ge("hider"));
	}

};

MigScript.UI.Settings = {
	openSettings : function() {

		// MigScript.DomUtil.removeChildNodes(MigScript.DomUtil.ge("pageBody"));
		MigScript.DomUtil.removeChildNodes(MigScript.DomUtil.ge("pageBody"));
		MigScript.DomUtil.appendDiv("pageBody", "wrapH");
		MigScript.DomUtil.appendDiv("wrapH", "wrapHI");
		var h = MigScript.DomUtil.appendDiv("wrapHI", "header");
		h.innerHTML = "<h1> Настройки Mig[vk]Script</h1>";
		// var d = MigScript.DomUtil.appendDiv("wrapHI", "settKillDiv");
		var killA = MigScript.DomUtil.dc("a");
		killA.style.cursor = "pointer";
		killA.innerHTML = "[Полностью очистить настройки]";
		killA.addEventListener("click", function() {
					MigScript.Settings.purgeSettings();
				}, false);
		h.appendChild(killA);

		var killAl = MigScript.DomUtil.dc("a");
		killAl.style.cursor = "pointer";
		killAl.innerHTML = "[Сбросить оповещения]";
		killAl.addEventListener("click", function() {
					MigScript.UI.killAlerts();
				}, false);
		h.appendChild(killAl);

		MigScript.DomUtil.appendDiv("pageBody", "wrap2");
		MigScript.DomUtil.appendDiv("wrap2", "wrap1");
		var config_cont = MigScript.DomUtil.appendDiv("wrap1", "content");
		config_cont.className = "editorPanel clearFix";

		var c = MigScript.DomUtil.dc("center");

		var sett_table = MigScript.DomUtil.dc("table");
		sett_table.id = "s_table";
		c.appendChild(sett_table);
		config_cont.appendChild(c);
		try {
			// MigScript.Settings.getSortedSettings(MigScript.Settings.loadSettings());
			for (var i = 0; i < MigScript.Settings.tsettings.length; i++) {
				var row = MigScript.DomUtil.dc("tr");
				var td0 = MigScript.DomUtil.dc("td");
				td0.className = "td0";
				sett_table.appendChild(row);
				row.appendChild(td0);
				if (MigScript.Settings.tsettings[i].text) {
					var el = document
							.createTextNode(MigScript.Settings.tsettings[i].text);
					td0.appendChild(el);

				}
				var td1 = MigScript.DomUtil.dc("td");
				td1.className = "td1";
				row.appendChild(td1);
				if (MigScript.Settings.tsettings[i].type == "alink") {
					var b = MigScript.DomUtil.dc("b");
					td1.appendChild(b);
					var a = MigScript.DomUtil.dc("a");
					a.setAttribute("_id", i);
					a.href = "#_";
					a.id = MigScript.Settings.tsettings[i].id;
					a.addEventListener("click", function() {
								MigScript.Settings.tsettings[this
										.getAttribute("_id")].action();
							}, true);
					a.style.color = "#aaaa00";
					a.title = MigScript.Settings.tsettings[i].title;
					if (MigScript.Settings.tsettings[i].value != null
							&& MigScript.Settings.tsettings[i].value != "") {
						a
								.appendChild(document
										.createTextNode(MigScript.Settings.tsettings[i].value));
					} else {
						a
								.appendChild(document
										.createTextNode(MigScript.Settings.tsettings[i].defaultValue));
					}
					b.appendChild(a);
					MigScript.Settings.tsettings[i].condition();
				} else if (MigScript.Settings.tsettings[i].type == "area") {
					var ar = MigScript.DomUtil.dc("textarea");
					td1.appendChild(ar);
					td1.style.width = "300px";
					ar.style.width = "300px";
					ar.style.height = "200px";
					ar.id = MigScript.Settings.tsettings[i].id;
					ar.value = MigScript.Settings.tsettings[i].value;
				} else if (MigScript.Settings.tsettings[i].type == "text") {
					var font = MigScript.DomUtil.dc("font");
					font.color = "#aaaa00";
					font.style.marginLeft = "50px";
					td1.appendChild(font);
					font
							.appendChild(document
									.createTextNode(MigScript.Settings.tsettings[i].value));
				} else if (MigScript.Settings.tsettings[i].type == "input") {
					var input = MigScript.DomUtil.dc("input");
					input.type = "text";
					input.value = MigScript.Settings.tsettings[i].value;
					input.className = "config_input";
					input.id = MigScript.Settings.tsettings[i].id;
					td1.appendChild(input);
				} else if (MigScript.Settings.tsettings[i].type == "checkbox") {
					var chk = new MigScript.CustomObjects.CheckboxClass(
							MigScript.Settings.tsettings[i].id,
							MigScript.Settings.tsettings[i].value);
					chk.body.style.marginLeft = "50px";
					chk.body.style.width = "16px";
					chk.body.style.height = "16px";
					chk.body.style.position = "relative";
					chk.body.style.top = "2px";
					td1.appendChild(chk.body);
				} else if (MigScript.Settings.tsettings[i].type == "section") {
					var d1 = MigScript.DomUtil.dc("div");
					var d2 = MigScript.DomUtil.dc("div");
					var d3 = MigScript.DomUtil.dc("div");
					d1.style.display = "inline";
					d2.style.display = "inline";
					d2.style.width = "300px";
					d3.style.display = "inline";
					var c1 = MigScript.DomUtil.dc("center");
					MigScript.DomUtil.removeChildNodes(row);
					td0 = MigScript.DomUtil.dc("td");
					td0.colSpan = "2";
					row.appendChild(td0);
					td0.appendChild(c1);
					c1.appendChild(d1);
					c1.appendChild(d2);
					c1.appendChild(d3);
					var hr = MigScript.DomUtil.dc("hr");
					d1.appendChild(hr);

					hr = MigScript.DomUtil.dc("hr");
					d3.appendChild(hr);
					var b1 = MigScript.DomUtil.dc("b");
					d2.appendChild(b1);
					b1
							.appendChild(document
									.createTextNode(MigScript.Settings.tsettings[i].label));
				}
				/*
				 * else if (MigScript.Settings.tsettings[i].type == "drop") {
				 * var sel = MigScript.DomUtil.dc("select"); sel.multiple = "";
				 * sel.size = "5"; sel.id = MigScript.Settings.tsettings[i].id;
				 * sel.value = MigScript.Settings.tsettings[i].value;
				 * sel.style.backgroundColor = "#ffcc00"; var _id =
				 * MigScript.Settings.tsettings[i].id;
				 * MigScript.Settings.tsettings[i].source(_id);
				 * td1.appendChild(sel); }
				 */
			}
			var br = MigScript.DomUtil.dc("br");
			config_cont.appendChild(br);
			br = MigScript.DomUtil.dc("br");
			config_cont.appendChild(br);

			config_cont.appendChild(MigScript.UI.createVkBtnSet());

			MigScript.UI.addVkBtn("Сохранить настройки", "150px", function() {
						MigScript.Settings.saveSettings();
					});
		} finally {
			MigScript.UI.addVkBtn("Сбросить по умолчанию", "150px", function() {
						MigScript.Settings.resetSettings();
					});
			config_cont.appendChild(MigScript.DomUtil.dc("br"));
		}
	}

};

MigScript.UI.MainMenu = {
	menuFloater : null,
	isOpen : false,
	resetMenu : function() {
		var mask = MigScript.Settings.local_settings[38].split("|");

		function checkMask(arg) {
			for (var i = 0; i < mask.length; i++) {
				if (arg == mask[i]) {
					return true;
				}
			}
			return false;
		}

		if (MigScript.Settings.local_settings[37]) {
			var menu = MigScript.DomUtil.ge("nav").getElementsByTagName("a");
			for (var i = 0; i < menu.length; i++) {

				var els = menu[i].innerHTML.split(" ");
				if (els[1] || (els[1] && els[2])) {
					if (!els[1].match(/\(<b>\d+<\/b>\)/) && checkMask(els[0])) {
						menu[i].innerHTML = els[1];
					}
				}

			}
		}

	},
	extendMenu : function() {
		var addCont = function(el, prefix) {
			el.addEventListener("mouseover", function() {
				// MigScript.DomUtil.ge(prefix + "_ext").style.marginLeft =
				// "10px";
				MigScript.DomUtil.toggle(MigScript.DomUtil.ge(prefix + "_ext"));
			}, false);
			el.addEventListener("mouseout", function() {
						var timer = setTimeout(function() {
									MigScript.DomUtil.hide(prefix + "_ext");
								}, MigScript.Settings.local_settings[4]);
						MigScript.DomUtil.ge(prefix + "_ext").setAttribute(
								"timer", uneval(timer));
					}, false);

			var d = MigScript.DomUtil.dc("div");
			d.style.display = "none";
			d.id = prefix + "_ext";
			d.style.backgroundColor = "rgba(255,255,255,0.6)";
			d.style.zIndex = "5000";
			d.addEventListener("mouseover", function() {
						clearTimeout(eval(this.getAttribute("timer")));
						MigScript.DomUtil.show(prefix + "_ext");
					}, false);
			el.parentNode.appendChild(d);
			if (MigScript.Settings.local_settings[32]) {
				d.style.position = "absolute";
				d.style.marginTop = "-20px";
				d.style.marginLeft = d.parentNode.offsetWidth - 5 + "px";
				d.style.zIndex = "50000";
				d.style.borderTop = "1px solid #B1BDD6";
				d.style.borderRight = "1px solid #B1BDD6";
				d.style.borderBottom = "1px solid #B1BDD6";
				d.addEventListener("mouseout", function() {
							var timer = setTimeout(function() {
										MigScript.DomUtil.hide(prefix + "_ext");
									}, MigScript.Settings.local_settings[4]);
							MigScript.DomUtil.ge(prefix + "_ext").setAttribute(
									"timer", uneval(timer));
						}, false);
			}
		};
		var addBtn = function(prefix, label, href) {
			var a = MigScript.DomUtil.dc("a");
			a.style.setProperty("color", "#666", "important");
			a.style.cursor = "pointer";
			a.innerHTML = "&nbsp;&nbsp;&nbsp;" + label;
			if (href) {
				a.href = MigScript.HOST + href;
			}
			MigScript.DomUtil.ge(prefix + "_ext").appendChild(a);
			return a;
		};

		if (MigScript.Settings.local_settings[19]) {
			var menu = MigScript.DomUtil.ge("sideBar")
					.getElementsByTagName("ol")[0].getElementsByTagName("a");
			// Косметика
			var edit = MigScript.DomUtil.geByClass("edit", MigScript.DomUtil
							.ge("myprofile"), "a")[0];
			edit.parentNode.removeChild(edit);
			var ll = MigScript.DomUtil.geByClass("hasedit", MigScript.DomUtil
							.ge("myprofile"), "a")[0];
			ll.style.padding = "3px 3px 3px 6px";
			ll.className = "";

			for (var i = 0; i < menu.length; i++) {
				// Добавляем дополнительные кнопки
				if (menu[i].href == MigScript.HOST + "/newsfeed.php") {
					addCont(menu[i], "news");
					addBtn("news", "Группы", "/newsfeed.php?section=groups");
					addBtn("news", "Комментарии",
							"/newsfeed.php?section=comments");
				}
				if (menu[i].href == MigScript.HOST + "/friends.php") {
					addCont(menu[i], "friends");
					addBtn("friends", "Избранные").addEventListener("click",
							function(e) {
								MigScript.UI.FavContainer.openFavContainer(e);
								MigScript.UI.FavContainer.addFriends();
							}, true);
				}

				if (menu[i].href == MigScript.HOST + "/audio.php") {
					addCont(menu[i], "audio");
					addBtn("audio", "Залить", "/audio.php?act=new");
					addBtn("audio", "Редактировать", "/audio.php?act=edit");
				}
				if (menu[i].href == MigScript.HOST + "/groups.php") {
					addCont(menu[i], "groups");
					addBtn("groups", "Избранные").addEventListener("click",
							function(e) {
								MigScript.UI.FavContainer.openGrContainer(e);
								MigScript.UI.FavContainer.addGroups();
							}, true);
				}
				if (menu[i].href == MigScript.HOST + "/mail.php?id="
						+ MigScript.myUid) {
					addCont(menu[i], "mail");
					addBtn("mail", "Исходящие", "/mail.php?out=1");
					addBtn("mail", "Написать", "/mail.php?act=write");

				}
				if (menu[i].href == MigScript.HOST + "/notes.php") {
					addCont(menu[i], "notes");
					addBtn("notes", "Написать", "/notes.php?act=new");
					addBtn("notes", "Комментарии", "/notes.php?act=comms");
				}
				if (menu[i].href == MigScript.HOST + "/events.php") {
					addCont(menu[i], "events");
					addBtn("events", "Календарь", "/events.php?act=calendar");
				}
				if (menu[i].href == MigScript.HOST + "/photos.php") {
					addCont(menu[i], "photos");
					addBtn("photos", "Новый&nbsp;альбом", "/photos.php?act=new");
					addBtn("photos", "Обзор", "/photos.php?act=albums");
					addBtn("photos", "Комментарии", "/photos.php?act=comments");
					addBtn("photos", "Фото&nbsp;с&nbsp;вами",
							"/photos.php?act=user&id=" + MigScript.myUid);

				}
				if (menu[i].href == MigScript.HOST + "/video.php") {
					addCont(menu[i], "video");
					addBtn("video", "Загрузить", "/video.php?act=new");
					addBtn("video", "Комментарии",
							"/video.php?act=comments&id=" + MigScript.myUid);
				}

				if (menu[i].href == MigScript.HOST + "/fave.php") {
					addCont(menu[i], "fave");
					addBtn("fave", "Кто&nbsp;\"заложил\"").addEventListener(
							"click", function(e) {
								MigScript.UI.WhoFaved.open(e);
							}, true);
				}
				if (menu[i].href == MigScript.HOST + "/id" + MigScript.myUid) {
					addCont(menu[i], "person");
					addBtn("person", "Стена", "/wall.php").style.padding = "3px 3px 3px 6px";
					addBtn("person", "Редактировать",
							"/editProfile.php?act=general").style.padding = "3px 3px 3px 6px";
				}
				if (menu[i].href == MigScript.HOST
						+ "/apps.php?act=notifications") {
					addCont(menu[i], "apps");
					addBtn("apps", "Удалить оповещения").addEventListener(
							"click", function() {
								(new MigScript.Ajax.AjaxClass())
										.get("/apps.php?act=a_delete_all_not");
							}, true);
				}
				if (menu[i].id == "sett_link") {
					addCont(menu[i], "sett");
					addBtn("sett", "Обновить").addEventListener("click",
							function() {
								MigScript.Update.forceUpd();
							}, true);
					addBtn("sett", "Убрать&nbsp;оповещения").addEventListener(
							"click", function() {
								MigScript.UI.killAlerts();
							}, true);

					addBtn("sett", "Группа&nbsp;Mig[VK]Script", "/club12388587").target = "_blank";
					/*
					 * addBtn("sett", "Новое
					 * оповещение").addEventListener("click", function() {
					 * MigScript.alert("Инициировано", "Новое оповещение",
					 * "message"); }, true);
					 */
				}

			}
		}
	},
	addUnfix : function() {
		var unfixBtn = MigScript.DomUtil.dc("a");
		unfixBtn.innerHTML = "^Отцепить^";
		unfixBtn.id = "menuUnfix";
		unfixBtn.style.fontSize = "6pt";
		unfixBtn.style.cursor = "pointer";
		unfixBtn.addEventListener("click", function() {
					MigScript.UI.MainMenu.wrapMenu();
					MigScript.UI.MainMenu.delUnfix();
					MigScript.UI.MainMenu.isOpen = true;
					MigScript.Util.serialize("mainMenu_open",
							MigScript.UI.MainMenu.isOpen);
				}, false);
		MigScript.DomUtil.ge("nav").insertBefore(unfixBtn,
				MigScript.DomUtil.ge("myprofile"));
	},
	delUnfix : function() {
		var btn = MigScript.DomUtil.ge("menuUnfix");
		if (btn) {
			btn.parentNode.removeChild(btn);
		}
	},
	wrapMenu : function() {
		var x, y;
		x = MigScript.Util.deserialize("mainMenu_x", 30);
		y = MigScript.Util.deserialize("mainMenu_y", 30);
		MigScript.UI.MainMenu.menuFloater = new MigScript.CustomObjects.FloaterClass(
				x, y, "mainMenu", "Меню", {
					minWidth : 125,
					minHeight : 45,
					width : MigScript.Util.deserialize("mainMenu_W", 0),
					height : MigScript.Util.deserialize("mainMenu_H",
							MigScript.DomUtil.ge("sideBar").offsetHeight)
				});
		MigScript.UI.MainMenu.menuFloater.body.style.setProperty("overflow-y",
				"hidden", "important");
		// MigScript.UI.MainMenu.menuFloater.cont.removeChild(MigScript.UI.MainMenu.menuFloater.body);
		MigScript.UI.MainMenu.menuFloater.cont
				.removeChild(MigScript.UI.MainMenu.menuFloater.txt);
		// MigScript.UI.MainMenu.menuFloater.body =
		// MigScript.DomUtil.ge("sideBar");
		MigScript.UI.MainMenu.menuFloater.body.appendChild(MigScript.DomUtil
				.ge("sideBar"));
		if (MigScript.Settings.local_settings[22]) {
			GM_addStyle("#Information .people_table{width:100%;}#my_audios .audioRow{width:500px;}#videocomment{width:520px;}#videoinfo{width:720px;} #photocomment{width:520px;}.comment .body .justComment, .comment .bigbody .justComment{width:450px;}.comment .body, .comment .bigbody {width:520px;}#photoinfo{width:720px;}.audioRow {width:520px;}#startagroup{width:300px;}.groupslist .info{width:500px;} .groupslist .grouprow{width:723px;}.commentHead{float:none;}.note .note_body{width: 490px;}.inbox {width:755px!important;}.mainPanel{width:575px;} .results{width:725px;} #pageBody{width:760px;}#fave #leftColumn{width:515px;}#fave #rightColumn{width:210px;} #rightColumn{width:525px;} .dataWrap{width:400px;}  #group.profile .right{width:200px; margin-left:24px;} #group.profile .left{width:500px;}");
		}
		MigScript.UI.MainMenu.menuFloater.onClose = function() {
			// MigScript.DomUtil.ge("sideBar").parentNode.removeChild(MigScript.DomUtil.ge("sideBar"));
			try {
				MigScript.DomUtil.insertAfter("sideBar", "pageHeader");
			} catch (e) {
				MigScript.DomUtil.insertAfter("sideBar", "pageHeader1");
			}
			MigScript.UI.MainMenu.addUnfix();
			if (MigScript.Settings.local_settings[22]) {
				GM_addStyle("#my_audios .audioRow{width:450px;} #videocomment{width:400px;}#videoinfo{width:606px;}#photocomment{width:400px;}.comment .body .justComment, .comment .bigbody .justComment{width:345px;}.comment .body, .comment .bigbody {width:400px;}#photoinfo{width:606px;}.audioRow {width:450px;}#startagroup{width:200px;}.groupslist .info{width:364px;} .groupslist .grouprow{width:594px;}.commentHead{float:left;}.note .note_body{width: 370px;}.inbox {width:auto!important;}.mainPanel{width:451px;} .results{width:606px;}#pageBody{width:632px;}#fave #leftColumn{width:398px;}  #rightColumn{width:396px;} .dataWrap{width:260px;}  #group.profile .right{width:200px; margin-left:0px;} #group.profile .left{width:396px;}");
			}
			MigScript.UI.MainMenu.isOpen = false;
			MigScript.Util.serialize("mainMenu_open",
					MigScript.UI.MainMenu.isOpen);
		};
		MigScript.DomUtil.ge("sideBar").style.margin = "0";
		MigScript.DomUtil.ge("sideBar").style.setProperty("width", "auto",
				"important");
		MigScript.DomUtil.ge("sideBar").style.minWidth = "118px";
		MigScript.UI.MainMenu.menuFloater.body.style.overflow = "hidden";
		// MigScript.UI.MainMenu.menuFloater.cont.appendChild(MigScript.DomUtil.ge("sideBar"));
		// MigScript.DomUtil.ge("sideBar").parentNode.removeChild(MigScript.DomUtil.ge("sideBar"));
	},
	init : function() {
		MigScript.UI.MainMenu.isOpen = MigScript.Util.deserialize(
				"mainMenu_open", "false");
		if (MigScript.Settings.local_settings[21]) {
			if (MigScript.UI.MainMenu.isOpen) {
				MigScript.UI.MainMenu.wrapMenu();
			} else {
				MigScript.UI.MainMenu.addUnfix();
			}
		}
	}
};

MigScript.UI.Menu = {
	IMs : [],
	addMenu : function(elem, menuId) {
		elem.addEventListener("mouseover", function(e) {
					e.stopPropagation();
					MigScript.UI.Menu.showMenu(menuId, elem, e);
				}, true);
		elem.addEventListener("mouseout", function(e) {
					e.stopPropagation();
					MigScript.UI.Menu.hideMenu("menu_" + menuId);
				}, true);
	},
	wrapMessages : function(uid, owner) {
		var x = document.documentElement.clientWidth / 2 - 120;
		var y = 200;
		var fl = new MigScript.CustomObjects.FloaterClass(x, y, "messager"
						+ uid, "Сообщение", {
					minHeight : 158
				});
		fl.onClose = function() {
			document.body.removeChild(MigScript.DomUtil.ge("messager" + uid));
		};

		var d0 = MigScript.DomUtil.dc("div");
		fl.body.appendChild(d0);
		var d1 = MigScript.DomUtil.dc("div");
		fl.body.appendChild(d1);
		var d2 = MigScript.DomUtil.dc("div");
		fl.body.appendChild(d2);

		var txt = MigScript.DomUtil.dc("a");
		txt.href = "/id" + uid;
		txt.innerHTML = owner;
		fl.txt.appendChild(txt);

		var input = MigScript.DomUtil.dc("input");
		input.typr = "text";
		input.id = "sbj_inp";
		input.style.width = "90%";
		input.style.height = "12px";
		input.style.fontSize = "8pt";
		input.style.marginTop = "5px";

		input.value = "Тема";

		var c = MigScript.DomUtil.dc("center");
		d1.appendChild(c);
		c.appendChild(input);

		var input2 = MigScript.DomUtil.dc("textarea");
		input2.id = "msg_inp";
		input2.style.width = "90%";
		input2.style.height = "80px";
		input2.style.fontSize = "8pt";
		input2.style.marginTop = "5px";
		input2.addEventListener("keypress", function(e) {
			if ((e.ctrlKey) && ((e.keyCode == 0xA) || (e.keyCode == 0xD))) {
				var udiv = this.parentNode.parentNode.parentNode;
				var msg = MigScript.DomUtil.getDescendantById(udiv, "msg_inp").value;
				var sbj = MigScript.DomUtil.getDescendantById(udiv, "sbj_inp").value;
				udiv.innerHTML = "<img src=\""
						+ MigScript.UI.Images.loaderImg() + "\"/>";
				MigScript.Messaging.sendMsg(uid, sbj, msg, udiv);
				udiv.addEventListener("click", function(e) {
							e.preventDefault();
							e.stopPropagation();
							document.body.removeChild(MigScript.DomUtil
									.ge("messager" + uid));
						}, true)
				udiv.addEventListener("keypress", function() {
							document.body.removeChild(MigScript.DomUtil
									.ge("messager" + uid));
						}, true);
			}
		}, true);

		c = MigScript.DomUtil.dc("center");
		d2.appendChild(c);
		c.appendChild(input2);
	},
	wrapIM : function(uid) {
		var x = document.documentElement.clientWidth / 2 - 120;
		var y = 200;
		var fl = new MigScript.CustomObjects.FloaterClass(x, y, "IM" + uid,
				"Мгновенные сообщения", {
					minHeight : 300,
					minWidth : 300,
					height : 300,
					width : 400
				});
		var tid = MigScript.UI.Menu.IMs.length - 1;

		var i = MigScript.DomUtil.dc("iframe");
		i.src = "/im.php?act=a_box&popup=1&sel=" + uid;
		i.style.border = "none";
		i.style.width = "100%";
		i.style.height = "99%";

		fl.body.appendChild(i);
		fl.onClose = function() {
			document.body.removeChild(MigScript.DomUtil.ge("IM" + uid));

			MigScript.UI.Menu.IMs[tid] = null;
			MigScript.Util.serialize("IMs", MigScript.UI.Menu.IMs);
		};
	},
	showIM : function(uid) {
		MigScript.UI.Menu.IMs.push(uid);
		MigScript.UI.Menu.wrapIM(uid);
		MigScript.Util.serialize("IMs", MigScript.UI.Menu.IMs);
	},
	getMenu : function(menuId, owner) {
		var menu = MigScript.DomUtil.ge("menu_" + menuId);
		if (menu == null) {
			menu = MigScript.UI.Menu.createMenu(menuId, owner);
		}
		return menu;
	},

	createMenu : function(menuId, owner) {
		var menu = MigScript.DomUtil.dc("div");
		menu.id = "menu_" + menuId;
		menu.className = "menu_cont";
		var isFr = MigScript.Friends.isFriend(menuId);
		var fav = MigScript.Friends.isFavFriend(menuId);
		for (var i = 0; i < MigScript.Menu.menuAttrs.length; i++) {
			if (MigScript.Menu.menuAttrs[i].forFriend == null
					|| (MigScript.Menu.menuAttrs[i].forFriend && isFr)
					|| (!MigScript.Menu.menuAttrs[i].forFriend && !isFr)) {
				if (((MigScript.Menu.menuAttrs[i].hasOwnProperty("forFav")) && ((MigScript.Menu.menuAttrs[i].forFav && fav) || (!MigScript.Menu.menuAttrs[i].forFav && !fav)))
						|| (!MigScript.Menu.menuAttrs[i]
								.hasOwnProperty("forFav"))) {
					var img = MigScript.DomUtil.dc("img");
					img.alt = MigScript.Menu.menuAttrs[i].label;
					img.title = MigScript.Menu.menuAttrs[i].label;
					img.src = MigScript.Menu.menuAttrs[i].img;
					img.className = "menu_button";
					img.setAttribute("_id", i);
					img.setAttribute("owner", owner);
					if (MigScript.Menu.menuAttrs[i].action != null) {
						MigScript.Menu.imgActions[i] = MigScript.Menu.menuAttrs[i].action;
						// doll = function(){action(menuId)};
						img.addEventListener("click", function(e) {
							MigScript.Menu.imgActions[this.getAttribute("_id")](
									menuId, e);
						}, true);
						menu.appendChild(img);
						img.style.cursor = "pointer";
					}
					if (MigScript.Menu.menuAttrs[i].url != null) {
						var link = MigScript.DomUtil.dc("a");
						link.href = MigScript.Menu.menuAttrs[i].url + menuId;
						link.appendChild(img);
						menu.appendChild(link);
					}
				}
			}
		}
		menu.addEventListener("mouseout", function(e) {
					e.stopPropagation();
					MigScript.UI.Menu.hideMenu(this.id);
				}, true);
		menu.addEventListener("mouseover", function(e) {
					e.stopPropagation();
					MigScript.UI.Menu.showMenu(this.id.match(/\d+/));
				}, true);
		return menu;
	},

	showMenu : function(menuId, elem, event) {
		var owner = event ? event.target.innerHTML : null;
		var menu = MigScript.UI.Menu.getMenu(menuId, owner);
		clearTimeout(eval(menu.getAttribute("timer")));
		menu.style.display = "block";
		menu.style.opacity = "1";
		if (event != null) {
			menu.style.left = (event.clientX + 15) + "px";
			menu.style.top = (event.pageY - 10) + "px";
		}
		if (elem != null) {
			document.body.appendChild(menu);
		}
	},
	hideMenu : function(menuId) {
		var menu = MigScript.DomUtil.ge(menuId);
		MigScript.UI.animateHide(menu);
	},
	init : function() {
		MigScript.UI.Menu.IMs = MigScript.Util.trimList(MigScript.Util
				.deserialize("IMs", []));
		var a = MigScript.UI.Menu.IMs;
		for (var i = 0; i < a.length; i++) {
			MigScript.UI.Menu.wrapIM(a[i]);
		}
	}
};

MigScript.UI.Group = {
	markFriends : function() {
		if (MigScript.Friends.friendList == null)
			MigScript.Friends.getFriends(MigScript.UI.Group.markFriends);
		else {
			for (var i = 0; i < MigScript.Friends.friendList.length; i++) {
				var div = MigScript.DomUtil.ge("memRow"
						+ MigScript.Friends.friendList[i][0]);
				if (div != null) {
					div.style.background = '#ffff00';
				}
			}
		}
	},
	createMngButton : function(label, id, onClick) {
		var s_row = MigScript.DomUtil.dc("div");
		s_row.className = "s_row";

		var div = MigScript.DomUtil.dc("div");
		div.className = "s_pad";
		div.id = id;
		var _label = document.createTextNode(label);
		div.appendChild(_label);
		div.addEventListener("click", onClick, true);
		div.addEventListener("mouseover", function() {
					this.className = "s_pad_over";
				}, true);
		div.addEventListener("mouseout", function() {
					this.className = "s_pad";
				}, true);
		s_row.appendChild(div);
		return s_row;
	},
	addReplyButtons : function() {
		var div0 = MigScript.DomUtil.ge("rows_content");
		var arr = div0.getElementsByTagName("div");

		MigScript.UI.Group.addReplyButton(arr);

	},
	addReplyButton : function(arr) {
		for (var i = 0; i < arr.length; i++) {
			var el = arr[i];
			if (el.className == "postIndex") {

				var postIndex = el.innerHTML;
			}

			if (el.className == "postBody") {

				for (var j = 0; j < el.childNodes.length; j++) {
					var node = el.childNodes[j];
					var head;
					var author;
					if (node.className == "postHeader") {
						head = node;
						author = node.getElementsByTagName("a")[0].innerHTML;
					}
					if (j == el.childNodes.length - 1) {
						var a = MigScript.DomUtil.dc("a");

						head.appendChild(a);
						a.innerHTML = "<b>[Ответить]</b>";
						a.style.cursor = "pointer";
						a.style.setProperty("float", "right", "");
						a.style.marginTop = "-20px";
						a.style.marginLeft = "100px";
						a.setAttribute("str", "@ " + postIndex + "  " + author
										+ ":\n\n");
						a.addEventListener("click", function() {
									MigScript.DomUtil.ge("post").value += this
											.getAttribute("str");
									MigScript.DomUtil.ge("post").focus();
								}, true);
					}
				}
			}
		}
	}
};

MigScript.UI.ExFriends = {
	isShown : null,
	isOpen : null,
	floater : null,
	createMenu : function() {
		var div = MigScript.DomUtil.ge("fr_cont");
		var div2;
		var div3;
		var div4;
		var head;
		if (div == null) {
			div = MigScript.DomUtil.dc("div");
			div.id = "fr_cont";
			div.className = "fr_cont";
			MigScript.DomUtil.ge("sideBar").appendChild(div);

			head = MigScript.DomUtil.dc("div");
			head.id = "fr_head";
			head.className = "fr_head";

			div.appendChild(head);

			div2 = MigScript.DomUtil.dc("div");
			div2.id = "fr_txt";
			div2.className = "fr_txt";

			div.appendChild(div2);

			if (MigScript.DomUtil.ge("fr_roll_btn") == null) {
				a = MigScript.DomUtil.dc("a");
				a.id = "fr_roll_btn";
				a.innerHTML = "<b>^</b>";
				a.title = "Отцепить";
				a.style.cursor = "pointer";
				a.style.fontSize = "8pt";
				a.style.setProperty("float", "right", "important");
				a.addEventListener("click", function(e) {
							MigScript.UI.ExFriends.isShown = true;
							MigScript.Util.serialize("exFloat", true);
							MigScript.DomUtil.ge("fr_cont").style.setProperty(
									"display", "none", "important");
							MigScript.UI.ExFriends.createList(e);
						}, true);
				head.appendChild(a);
			}

			div3 = MigScript.DomUtil.dc("div");
			div3.id = "fr_list";
			div3.className = "fr_list";
			if (!MigScript.UI.ExFriends.isOpen) {
				div3.style.display = "none";
			} else {
				div3.style.display = "block";
			}

			div.appendChild(div3);

			div4 = MigScript.DomUtil.dc("div");
			div4.id = "nd_chk";
			div.appendChild(div4);

			var a = MigScript.DomUtil.dc("a");
			a.style.cursor = "pointer";
			a.style.color = "#0000ff";
			var c = MigScript.DomUtil.dc("center");
			a.innerHTML = "[Проверить]";
			c.appendChild(a);
			a.addEventListener("click", function() {
				MigScript.UI.ExFriends.showProgress();
				MigScript.ExFriends.forceCheckFriends(function() {
							MigScript.UI.ExFriends
									.alertDel(MigScript.ExFriends.exFriends.length);
							MigScript.UI.ExFriends.notify();
						});
			}, true);
			div4.appendChild(c);
		} else {
			div.style.setProperty("display", "block", "important");
		}
		if (MigScript.Util.notNullCount(MigScript.ExFriends.exFriends) == 0) {
			div2 = MigScript.DomUtil.ge("fr_txt");
			div3 = MigScript.DomUtil.ge("fr_list");
			MigScript.DomUtil.removeChildNodes(div2);
			div2.innerHTML = "В списке друзей всё спокойно";
			MigScript.DomUtil.removeChildNodes(div3);
			div3.style.display = "none";
		} else {
			MigScript.UI.ExFriends.notify();

			MigScript.UI.ExFriends.alertDel(MigScript.Util
					.notNullCount(MigScript.ExFriends.exFriends));
		}
	},

	notify : function() {
		// MigScript.log("notify enter");
		// MigScript.log("ex is shown");
		var div = MigScript.DomUtil.ge("fr_list");
		MigScript.DomUtil.removeChildNodes(div);
		// MigScript.log("before cycle ");
		for (var i = 1; i <= MigScript.ExFriends.exFriends.length; i++) {
			// MigScript.log("notify cycle " + i);
			var ndiv = MigScript.DomUtil.dc("div");
			ndiv.id = "nd" + i;
			ndiv.className = "fr_pad";
			ndiv.innerHTML = i + ". &nbsp;";

			var c_link = MigScript.DomUtil.dc("div");
			c_link.className = "c_link";

			var link = MigScript.DomUtil.dc("a");
			link.href = MigScript.HOST + "/id"
					+ MigScript.ExFriends.exFriends[i - 1][0];
			link.innerHTML = MigScript.ExFriends.exFriends[i - 1][1]
					+ "</a>&nbsp;";
			link.style.color = "#0000ff";
			link.target = "_blank";
			c_link.appendChild(link);
			ndiv.appendChild(c_link);

			ndiv.addEventListener("mouseover", function() {
						MigScript.DomUtil.highlight(this);
					}, true);
			ndiv.addEventListener("mouseout", function() {
						MigScript.DomUtil.unlight(this);
					}, true);

			var crossDiv = MigScript.DomUtil.dc("div");
			crossDiv.className = "cross";
			var a = MigScript.DomUtil.dc("a");
			a.innerHTML = "[x]";
			a.style.color = "#ff0000";
			a.style.cursor = "pointer";
			a.id = "cross" + i;
			// a.className = "cross";
			a.addEventListener("click", function() {
						MigScript.UI.ExFriends.deleteNotification(this.id);
					}, true);
			ndiv.insertBefore(crossDiv, c_link);
			crossDiv.appendChild(a);
			div.appendChild(ndiv);

		}
	},

	alertDel : function(i) {

		var div = MigScript.DomUtil.ge("fr_txt");
		var head = MigScript.DomUtil.ge("fr_head");
		MigScript.log("exFr not null: " + i);
		if (i == 0) {
			MigScript.UI.ExFriends.createMenu();
		} else {
			div.innerHTML = "<font color='#2B587A'><center><b><u>Бывшие друзья</u></b></font><br>У вас <br><b>"
					+ i + "</b> человек в списке бывших друзей!</center>";
			if (MigScript.DomUtil.ge("nd_btn") == null) {
				var a = MigScript.DomUtil.dc("a");
				a.id = "nd_btn";
				if (MigScript.DomUtil.ge("fr_list").style.display == "none") {
					a.innerHTML = "[+]";
					a.title = "Развернуть";
				} else {
					a.innerHTML = "[-]";
					a.title = "Свернуть";
				}

				a.style.cursor = "pointer";
				a.style.fontSize = "8pt";
				a.addEventListener("click", function() {
							MigScript.UI.ExFriends.toggleList();
						}, true);
				head.appendChild(a);
			}
		}
	},

	deleteNotification : function(id) {
		var i = id.substring(5);
		var div = MigScript.DomUtil.ge("fr_list");
		div.removeChild(MigScript.DomUtil.ge("nd" + i));
		MigScript.ExFriends.exFriends[i - 1] = null;
		MigScript.Util.serialize("exFriends", MigScript.ExFriends.exFriends);
		MigScript.UI.ExFriends.alertDel(MigScript.Util
				.notNullCount(MigScript.ExFriends.exFriends));
	},

	toggleList : function() {
		MigScript.UI.ExFriends.notify();
		MigScript.DomUtil.toggle(MigScript.DomUtil.ge("fr_list"));
		MigScript.UI.togglePlusBtn("nd_btn");
		MigScript.UI.ExFriends.isOpen = !MigScript.UI.ExFriends.isOpen;
		MigScript.Util.serialize("frList_open", MigScript.UI.ExFriends.isOpen);
	},
	showProgress : function() {
		MigScript.DomUtil.ge("fr_txt").innerHTML = "<center><img src=\""
				+ MigScript.UI.Images.loaderImg() + "\"/></center>";
	},
	createList : function() {
		MigScript.UI.ExFriends.floater = new MigScript.CustomObjects.FloatListClass(
				"exFloat", "Бывшие друзья", {
					padCondition : function(uid) {
						return MigScript.Friends.isFavFriend(uid);
					},
					avatar : false,
					padDelete : true,
					list : MigScript.ExFriends.exFriends,
					update : function() {
						MigScript.ExFriends.forceCheckFriends(function() {
							MigScript.UI.ExFriends.floater.txt.childNodes[0].innerHTML = "[Обновить]";
							MigScript.UI.ExFriends.floater
									.populateList(MigScript.ExFriends.exFriends);
						});
					}
				});
		MigScript.UI.ExFriends.floater.onPadDeleted = function(n) {
			// MigScript.ExFriends.exFriends[n-1] = null;
			MigScript.ExFriends.exFriends = MigScript.Util
					.trimList(MigScript.ExFriends.exFriends);
			MigScript.Util
					.serialize("exFriends", MigScript.ExFriends.exFriends);
		};
		MigScript.UI.ExFriends.floater.onClose = function() {
			MigScript.UI.ExFriends.isShown = false;
			MigScript.UI.ExFriends.createMenu();
		};
		MigScript.UI.ExFriends.isShown = true;
		MigScript.UI.ExFriends.floater.populateList();
	},
	init : function() {
		if (MigScript.Settings.local_settings[2]) {
			MigScript.UI.ExFriends.isShown = MigScript.Util.deserialize(
					"exFloat", false);
			MigScript.UI.ExFriends.isOpen = MigScript.Util.deserialize(
					"frList_open", false);
			if (!MigScript.UI.ExFriends.isShown) {
				MigScript.UI.ExFriends.createMenu();
			} else {
				MigScript.UI.ExFriends.createList();
			}
		}
	}
};

MigScript.UI.OnlineFriends = {
	isShown : null,
	isOpen : null,
	floater : null,
	createStaticList : function() {
		var div = MigScript.DomUtil.ge("ol_cont");
		if (div == null) {
			div = MigScript.DomUtil.dc("div");
			div.id = "ol_cont";
			div.className = "fr_cont";
			// div.style.width = "100px";
			div.style.marginTop = "10px";
			MigScript.DomUtil.ge("sideBar").appendChild(div);

			var cdiv = MigScript.DomUtil.dc("div");
			cdiv.id = "c_div";
			div.appendChild(cdiv);

			var a;
			if (MigScript.DomUtil.ge("ol_roll_btn") == null) {
				a = MigScript.DomUtil.dc("a");
				a.id = "ol_roll_btn";
				a.innerHTML = "<b>^</b>";
				a.title = "Отцепить";
				a.style.cursor = "pointer";
				a.style.fontSize = "8pt";
				a.style.marginLeft = "70px";
				a.addEventListener("click", function(e) {
							MigScript.UI.OnlineFriends.isShown = true;
							MigScript.Util.serialize("olFloat", true);
							MigScript.DomUtil.ge("ol_cont").style.setProperty(
									"display", "none", "important");
							MigScript.UI.OnlineFriends.createList(e);
						}, true);
				cdiv.appendChild(a);
			}

			MigScript.UI.OnlineFriends.isOpen = MigScript.Util.deserialize(
					"olStatic_open", false);

			if (MigScript.DomUtil.ge("ol_btn") == null
					&& MigScript.OnlineFriends.onlineFriends.length > 0) {
				a = MigScript.DomUtil.dc("a");
				a.id = "ol_btn";
				if (!MigScript.UI.OnlineFriends.isOpen) {
					a.innerHTML = "[+]";
					a.title = "Развернуть";
				} else {
					a.innerHTML = "[-]";
					a.title = "Свернуть";
				}
				a.style.cursor = "pointer";
				a.style.fontSize = "8pt";
				a.style.marginLeft = "5px";
				a.addEventListener("click", function() {
							MigScript.UI.OnlineFriends.toggleStaticList();
						}, true);
				cdiv.appendChild(a);
			}

			var div2 = MigScript.DomUtil.dc("div");
			div2.id = "ol_txt";
			div2.className = "fr_txt";
			div.appendChild(div2);

			var div3 = MigScript.DomUtil.dc("div");
			div3.id = "ol_list";
			div3.className = "fr_list";
			if (!MigScript.UI.OnlineFriends.isOpen) {
				div3.style.display = "none";
			} else {
				div3.style.display = "block";
			}

			div.appendChild(div3);
		} else {
			div.style.setProperty("display", "block", "important");

		}
	},
	toggleStaticList : function() {
		MigScript.DomUtil.toggle(MigScript.DomUtil.ge("ol_list"));
		MigScript.UI.togglePlusBtn("ol_btn");
		MigScript.UI.OnlineFriends.isOpen = !MigScript.UI.OnlineFriends.isOpen;
		MigScript.Util.serialize("olStatic_open",
				MigScript.UI.OnlineFriends.isOpen);
	},
	createFloatList : function(e) {
		MigScript.UI.OnlineFriends.floater = new MigScript.CustomObjects.FloatListClass(
				"olFloat", "Онлайн", {
					padCondition : function(uid) {
						return MigScript.Friends.isFavFriend(uid);
					}
				});
		MigScript.UI.OnlineFriends.floater.onClose = function() {
			MigScript.UI.OnlineFriends.isShown = false;
			MigScript.UI.OnlineFriends.createList();
		};
		MigScript.UI.OnlineFriends.isShown = true;
		/*
		 * MigScript.UI.OnlineFriends.isFloat = true; var x,y; if (e) { x =
		 * e.pageX - 30; y = e.pageY - 50; } else { x =
		 * MigScript.Util.deserialize("olFloat_x", 0); y =
		 * MigScript.Util.deserialize("olFloat_y", 0); } if
		 * (!MigScript.UI.OnlineFriends.floater) {
		 * MigScript.UI.OnlineFriends.floater = new
		 * MigScript.CustomObjects.FloaterClass(x, y, "olFloat", "Онлайн",
		 * {minWidth: 105,minHeight: 64, width:
		 * MigScript.Util.deserialize("olFloat_W", 0) ,height:
		 * MigScript.Util.deserialize("olFloat_H", 0)});
		 * MigScript.UI.OnlineFriends.floater.onClose = function() {
		 * MigScript.Util.serialize("olFloat", false);
		 * MigScript.UI.OnlineFriends.isFloat = false;
		 * MigScript.UI.OnlineFriends.createList(); }; } else {
		 * MigScript.UI.OnlineFriends.floater.wakeUp(x, y); }
		 */
	},
	createList : function(e) {
		if (MigScript.DomUtil.ge("friendsOnline")
				&& MigScript.Util.checkLocation("id" + MigScript.myUid)) {
			MigScript.DomUtil.ge("friendsOnline").style.display = "none";
		}
		if (!MigScript.UI.OnlineFriends.isShown) {
			MigScript.UI.OnlineFriends.createStaticList();
		} else {
			MigScript.UI.OnlineFriends.createFloatList(e);
		}
		MigScript.UI.OnlineFriends.notifyNumber();
		MigScript.UI.OnlineFriends.addPeople();
	},
	addPeople : function() {
		if (!MigScript.UI.OnlineFriends.isShown) {
			MigScript.UI.OnlineFriends.addStaticPeople();
		} else {
			MigScript.UI.OnlineFriends.addFloatPeople();
		}
	},
	addStaticPeople : function() {
		if (MigScript.UI.OnlineFriends.isShown) {
			var div = MigScript.DomUtil.ge("ol_list");
			MigScript.DomUtil.removeChildNodes(div);
			for (var i = 1; i <= MigScript.OnlineFriends.onlineFriends.length; i++) {
				var ndiv = MigScript.DomUtil.dc("div");
				ndiv.id = "nd" + i;
				// Используем стиль модуля слежения за друзьями
				if (!MigScript.Friends
						.isFavFriend(MigScript.OnlineFriends.onlineFriends[i
								- 1][0])) {
					ndiv.className = "fr_pad";
				} else {
					ndiv.className = "fav_fr_pad";
				}
				var c_link = MigScript.DomUtil.dc("div");
				c_link.className = "c_link";

				var link = MigScript.DomUtil.dc("a");
				link.href = MigScript.HOST + "/id"
						+ MigScript.OnlineFriends.onlineFriends[i - 1][0];
				link.innerHTML = MigScript.OnlineFriends.onlineFriends[i - 1][1];
				// link.style.color = "#0000ff";
				link.target = "_top";
				link.addEventListener("mouseover", function(e) {
					var uid = this.href.substring(this.href.indexOf("/id") + 3);
					MigScript.UI.showAvatar(uid, e.clientX, 100, e.pageY,
							MigScript.DomUtil.ge("ol_list").width);
				}, true);
				link.addEventListener("mouseout", function(e) {
					var uid = this.href.substring(this.href.indexOf("/id") + 3);
					MigScript.UI.hideAvatar(uid);
				}, true);
				c_link.appendChild(link);
				ndiv.appendChild(c_link);

				ndiv.addEventListener("mouseover", function() {
							MigScript.DomUtil.highlight(this);
						}, true);
				ndiv.addEventListener("mouseout", function() {
							MigScript.DomUtil.unlight(this);
						}, true);
				div.appendChild(ndiv);

			}
		}
	},
	notifyNumber : function() {
		var div;
		if (!MigScript.UI.OnlineFriends.isShown) {
			div = MigScript.DomUtil.ge("ol_txt");

		} else {
			div = MigScript.UI.OnlineFriends.floater.txt;
		}
		div.innerHTML = "Онлайн <b>"
				+ MigScript.OnlineFriends.onlineFriends.length + "</b> человек";
	},
	addFloatPeople : function() {
		MigScript.UI.OnlineFriends.floater
				.populateList(MigScript.OnlineFriends.onlineFriends);
		/*
		 * if (MigScript.UI.OnlineFriends.isShown) { var div =
		 * MigScript.UI.OnlineFriends.floater.body;
		 * MigScript.DomUtil.removeChildNodes(div); for (var i = 1; i <=
		 * MigScript.OnlineFriends.onlineFriends.length; i++) { var ndiv =
		 * MigScript.DomUtil.dc("div"); ndiv.id = "nd" + i; //Используем стиль
		 * модуля слежения за друзьями if
		 * (!MigScript.Friends.isFavFriend(MigScript.OnlineFriends.onlineFriends[i -
		 * 1][0])) { ndiv.className = "fr_pad"; } else { ndiv.className =
		 * "fav_fr_pad"; } var c_link = MigScript.DomUtil.dc("div");
		 * c_link.className = "floater_link";
		 * 
		 * 
		 * var link = MigScript.DomUtil.dc("a"); var uid =
		 * MigScript.OnlineFriends.onlineFriends[i - 1][0]; link.href =
		 * MigScript.HOST + "/id" + uid; link.innerHTML =
		 * MigScript.OnlineFriends.onlineFriends[i - 1][1]; //link.style.color =
		 * "#0000ff"; link.target = "_top"; link.addEventListener("mouseover",
		 * function(e) { var uid = this.href.substring(this.href.indexOf("/id") +
		 * 3); MigScript.UI.showAvatar(uid, e.clientX, 170, e.pageY,
		 * MigScript.UI.OnlineFriends.floater.body.offsetWidth); }, true);
		 * link.addEventListener("mouseout", function(e) { var uid =
		 * this.href.substring(this.href.indexOf("/id") + 3);
		 * MigScript.UI.hideAvatar(uid); }, true); c_link.appendChild(link);
		 * ndiv.appendChild(c_link);
		 * 
		 * ndiv.addEventListener("mouseover", function() {
		 * MigScript.DomUtil.highlight(this); }, true);
		 * ndiv.addEventListener("mouseout", function() {
		 * MigScript.DomUtil.unlight(this); }, true); div.appendChild(ndiv); } }
		 */
	},
	init : function() {
		MigScript.UI.OnlineFriends.isShown = MigScript.Util.deserialize(
				"olFloat", false);
		MigScript.UI.OnlineFriends.createList();
	}
};

MigScript.UI.WhoFaved = {
	container : null,
	openContainer : function() {
		MigScript.UI.WhoFaved.isShown = true;
		MigScript.UI.WhoFaved.container = new MigScript.CustomObjects.FloatListClass(
				"favedList", "Я в закладках", {
					minWidth : 105,
					minHeight : 64
				});
		MigScript.UI.WhoFaved.container.onClose = function() {
			MigScript.Util.serialize("wf_isShown", false);
			MigScript.UI.WhoFaved.isShown = false;
		};

		var a = MigScript.DomUtil.dc("a");
		a.style.cursor = "pointer";
		a.addEventListener("click", function() {
			MigScript.WhoFaved.getList(function() {
				MigScript.UI.WhoFaved.addPeople();
				MigScript.UI.WhoFaved.container.txt.childNodes[0].innerHTML = "[Проверить]";
			});
			this.innerHTML = "<img src=\"" + MigScript.UI.Images.loaderImg()
					+ "\"/>";
		}, true);
		a.innerHTML = "[Проверить]";

		// MigScript.UI.WhoFaved.container.wrapCont.style.setProperty("width",
		// "165px", "important");
		MigScript.UI.WhoFaved.container.txt.appendChild(a);
	},
	addPeople : function() {
		if (MigScript.UI.WhoFaved.container.isShown) {
			MigScript.UI.WhoFaved.container
					.populateList(MigScript.WhoFaved.favedList);
		}
	},
	open : function() {
		if (MigScript.UI.WhoFaved.container) {
			MigScript.UI.WhoFaved.container.wakeUp();
		} else {
			MigScript.UI.WhoFaved.openContainer();
			MigScript.UI.WhoFaved.addPeople();

			/*
			 * MigScript.WhoFaved.getList(function() {
			 * MigScript.UI.WhoFaved.addPeople();
			 * MigScript.UI.WhoFaved.container.txt.childNodes[0].innerHTML =
			 * "[Проверить]"; });
			 */
			// MigScript.UI.WhoFaved.container.txt.childNodes[0].innerHTML =
			// "<img src=\"" + MigScript.UI.Images.loaderImg() + "\"/>";
		}

	},
	init : function() {
		MigScript.UI.WhoFaved.isShown = MigScript.Util.deserialize(
				"wf_isShown", false);

		if (MigScript.UI.WhoFaved.isShown) {

			MigScript.UI.WhoFaved.openContainer();
			MigScript.UI.WhoFaved.addPeople();
		}
	}
};

MigScript.Styler = {
	skinList : [],
	getSkinsList : function(id) {
		if (!MigScript.opera) {
			var url = MigScript.CSS_HOST + "/getlist.php?sortby=name";
			GM_xmlhttpRequest({
				method : "GET",
				url : url,
				onreadystatechange : function(o) {
					if (o.readyState == 4) {
						MigScript.Styler.parseSkinList(o.responseText);
						MigScript.DomUtil.ge("ddplace")
								.appendChild(MigScript.Styler.getSelect());
						MigScript.DomUtil.ge("skinimg").src = MigScript.UI.Images
								.noDataImg();
						if (MigScript.Settings.local_settings[11] == null
								|| MigScript.Settings.local_settings[11] == ""
								|| MigScript.Settings.local_settings[11] == "Стандартный") {
							MigScript.Styler
									.showSkinInfo(MigScript.Styler.skinList[0]);
						} else {
							for (var i = 0; i < MigScript.Styler.skinList.length; i++) {
								if (MigScript.Styler.skinList[i].name == MigScript.Settings.local_settings[11]) {
									MigScript.Styler
											.showSkinInfo(MigScript.Styler.skinList[i]);
								}
							}
						}

					}
				}
			});
		}
	},

	parseSkinList : function(json) {
		if (json.charAt(0) != "[") {
			json = "[" + json.substr(1);
		}
		if (json.charAt(json.length - 1) != "]") {
			json = json + json.substring(0, json.length - 1) + "]";
		}
		// MigScript.log(json);

		MigScript.Styler.skinList = eval("(" + json + ")");
	},

	getSelect : function() {
		var select = MigScript.DomUtil.ge("config_css_dropdown");
		if (!select) {
			select = MigScript.DomUtil.dc("select");
			select.multiple = "";
			select.size = "15";
			select.id = "config_css_dropdown";
			select.addEventListener("change", function(e) {
						var thid = e.target.value;
						var skin = MigScript.Styler.skinList[thid];
						MigScript.Styler.showSkinInfo(skin);
					}, false);
			for (var i = 0; i < MigScript.Styler.skinList.length; i++) {
				var opt = MigScript.DomUtil.dc("option");
				opt.value = i;
				opt.innerHTML = MigScript.Styler.skinList[i].name;
				select.appendChild(opt);
			}
		}
		return select;
	},

	createSkinSelector : function() {
		MigScript.UI.Dialog.getDialog("Выберите скин");
		var t = MigScript.DomUtil.dc("table");
		var r = MigScript.DomUtil.dc("tr");
		t.appendChild(r);
		MigScript.DomUtil.ge("dlg_body").appendChild(t);

		var td0 = MigScript.DomUtil.dc("td");
		td0.style.width = "250px";
		td0.style.height = "300px";
		// s1.style.setProperty("float", "left", "");
		td0.id = "skinimg_c";
		r.appendChild(td0);

		var im = MigScript.DomUtil.dc("img");
		im.style.width = "250px";
		im.style.maxHeight = "300px";
		im.id = "skinimg";
		im.src = MigScript.UI.Images.loaderImg();
		td0.appendChild(im);

		var td1 = MigScript.DomUtil.dc("td");
		td1.style.verticalAlign = "top";
		r.appendChild(td1);

		var d = MigScript.DomUtil.dc("div");
		d.id = "ddplace";

		td1.appendChild(d);

		var d2 = MigScript.DomUtil.dc("div");
		d2.style.marginTop = "10px";
		d2.id = "skininfo";
		td1.appendChild(d2);

		var ok_btn = MigScript.DomUtil.ge("skin_ok_btn");
		if (ok_btn == null) {
			ok_btn = MigScript.DomUtil.dc("div");
			ok_btn.id = "skin_ok_btn";
			MigScript.DomUtil.ge("dlg_ok_btn").appendChild(ok_btn);
		}
		ok_btn.className = "box_button";
		ok_btn.innerHTML = "Установить скин";

		ok_btn.addEventListener("click", function() {
					var i = MigScript.DomUtil.ge("config_css_dropdown").value;
					var skin = MigScript.Styler.skinList[i];
					MigScript.Styler.installSkin(skin.id);
					MigScript.DomUtil.ge("config_css_select").innerHTML = skin.name;
					MigScript.DomUtil.ge("config_css_select").setAttribute(
							"value", skin.name);
					MigScript.UI.Dialog.destroyDlg();
				}, true);

	},

	showSkinSelector : function() {

		MigScript.Styler.createSkinSelector();
		MigScript.Styler.getSkinsList();
		// MigScript.Styler.showSkinInfo(MigScript.Styler.skinList[i]);
	},

	showSkinInfo : function(skin) {

		var img = null;
		try {
			img = skin.img;
			if (img) {
				MigScript.DomUtil.ge("skinimg").src = img;
			} else {
				var url = MigScript.CSS_HOST + "/getimg.php?id=" + skin.id
						+ "&body=1";
				MigScript.DomUtil.ge("skinimg").src = MigScript.UI.Images
						.loaderImg();
				GM_xmlhttpRequest({
					method : "GET",
					url : url,
					onreadystatechange : function(o) {
						if (o.readyState == 4) {
							MigScript.DomUtil.ge("skinimg").src = o.responseText;
						}
					}
				});
			}
		} catch (e) {
		} finally {
			MigScript.DomUtil.ge("skininfo").innerHTML = "Скин <b>" + skin.name
					+ "</b> <br>Автор: " + skin.author + "<br>Комментарий: "
					+ skin.comment;
		}
	},

	installSkin : function(id) {
		var url = MigScript.CSS_HOST + "/getcss.php?id=" + id;
		// MigScript.log(url);
		GM_xmlhttpRequest({
			method : "GET",
			url : url,
			onreadystatechange : function(o) {
				if (o.readyState == 4) {
					MigScript.DomUtil.ge("config_userstyle").value = o.responseText;
				}
			}
		});
	},

	getDefaultStyle : function() {
		return "#message{" + "background-color: #ffffaa;" + "}"
				+ ".comment .header{" + "background-color: #ffeeaa;" + "}"
				+ ".mailbox table th{" + "background-color: #ffeeaa;" + "}"
				+ MigScript.Styler.getZeroStyle();
	},
	getZeroStyle : function() {
		return ".fr_cont{"
				+ " background:transparent!important;"
				+ " display: block!important;"
				+ "	margin-top: 6px!important;"
				+ " padding: 3px!important;"
				+ " min-width: 112px!important;"
				+ " }"
				+ "	.fr_txt{"
				+ " border-bottom: 1px solid #B1BDD6!important;"
				+ "background-color: rgba(200,200,200,0.4)!important;"
				+ "}"
				+ "	.fr_head{"
				+ " border-bottom: 1px solid #B1BDD6!important;"
				+ "height:15px;"
				+ "background-color: rgba(200,200,200,0.4)!important;"
				+ "}"
				+ " .fr_list{"
				+ "	border-bottom: 1px solid ##B1BDD6!important;"
				+ "}"
				+ " .fr_pad{"
				+ " background-color: rgba(220,220,220,0.3)!important;"
				+ " vertical-align: middle!important;"
				+ " display: block!important;"
				+ " text-align: left!important;"
				+ " word-wrap: break-line!inportant;"
				+ " width: 99px!important;"
				+ " float:left!important;"
				+ " min-height:26px!important;"
				+ " padding-left:5px!important;"
				+ " border-right:1px dashed #ADBBCA!important;"
				+ " border-bottom:1px dashed #ADBBCA!important;"
				+ "}"
				+ " .fr_pad_h{"
				+ " background-color: rgba(200,200,200,0.9)!important;"
				+ " vertical-align: middle!important;"
				+ " text-align: left!important;"
				+ " display: block!important;"
				+ " opacity: 0.6!important;"
				+ "word-wrap: break-line!important;"
				+ "width: 99px!important;"
				+ "float:left!important;"
				+ " min-height:26px!important;"
				+ " padding-left:5px!important;"
				+ " border-right:1px dashed #ADBBCA!important;"
				+ " border-bottom:1px dashed #ADBBCA!important;"
				+ "}"
				+ " .fav_fr_pad{"
				+ " background-color:  rgba(180,180,180,0.5)!important;"
				+ " vertical-align: middle!important;"
				+ " font-weight: bold!important;"
				+ " display: block!important;"
				+ " text-align: left!important;"
				+ "word-wrap: break-line!important;"
				+ "width:99px!important;"
				+ "float:left!important;"
				+ " min-height:26px!important;"
				+ " padding-left:5px!important;"
				+ " border-right:1px dashed #ffffff!important;"
				+ " border-bottom:1px dashed #ffffff!important;"
				+ "}"
				+ ".fav_fr_pad_h{"
				+ " background-color: rgba(180,180,180,0.8)!important;"
				+ " vertical-align: middle!important;"
				+ " text-align: left!important;"
				+ " font-weight: bold!important;"
				+ " display: block!important;"
				+ " opacity: 0.6!important;"
				+ " word-wrap: break-line!important;"
				+ " width: 99px!important;"
				+ " float:left!important;"
				+ " min-height:26px!important;"
				+ " padding-left:5px!important;"
				+ " border-right:1px dashed #ffffff!important;"
				+ " border-bottom:1px dashed #ffffff!important;"
				+ "}"
				+ "#nd_btn{"
				+ "float:right!important;"
				+ " margin-top:0px;"
				+ "}"
				+ ".css_preview{"
				+ " width: 350px;"
				+ "}"
				+ " .floater_cont{"
				+ " background: transparent!important;"
				+ " position: absolute!important;"
				+ " z-index: 200!important;"
				+ " text-align: left!important;"
				+ " display: block!important;"
				+ "}"
				+ " .floater_head{"
				+ " background-color: rgba(180,180,180,0.5)!important;"
				+ " display: block!important;"
				+ "height: 20px!important;"
				+ "border-bottom: 1px solid #B1BDD6!important;"
				+ "}"
				+ " .floater_body{"
				+ " text-align: left!important;"
				+ " display: block!important;"
				+ " overflow-x: hidden!important;"
				+ " overflow-y: auto!important;"
				+ "}"
				+ " .floater_txt{"
				+ " border-bottom: 1px solid #B1BDD6!important;"
				+ " height : 15px!important;"
				+ " text-align: center!important;"
				+ "background-color: rgba(255,255,255, 0.3)!important;"
				+ "}"
				+ " .floater_pad{"
				+ " background-color: #efe!important;"
				+ " vertical-align: middle!important;"
				+ " display: block!important;"
				+ " text-align: left!important;"
				+ "}"
				+ " .floater_pad_h{"
				+ " background-color: #ddd!important;"
				+ " vertical-align: middle!important;"
				+ " text-align: left!important;"
				+ " display: block!important;"
				+ " opacity: 0.6!important;"
				+ "}"
				+ ".alert_cont{"
				+ " position : fixed!important;"
				+ " background: transparent!important;"
				+ " border: 1px solid #B1BDD6!important;"
				+ " z-index: 300!important;"
				+ " width: 150px!important;"
				+ " text-align: left!important;"
				+ " vertical-align: middle!important;"
				+ " display: block!important;"
				+ " opacity: 1;"
				+ "}"
				+ ".alert_body{"
				+ " display: block!important;"
				+ " min-height: 20px!important;"
				+ " max-height: 150px!important;"
				+ " vertical-align: middle!important;"
				+ " padding: 3px!important;"
				+ "overflow: auto!important;"
				+ "background-color: rgba(255,255,255,0.5)!important;"
				+ "}"
				+ ".alert_head{"
				+ " background-color: rgba(180,180,180,0.6)!important;"
				+ " display: block!important;"
				+ " vertical-align: middle!important;"
				+ "height: 20px!important;"
				+ "border-bottom: 1px solid #B1BDD6!important;"
				+ "}"
				+ ".alert_capt{"
				+ "float: left!important;"
				+ "width: 130px!important;"
				+ "}"
				+ ".message_alert_cont{"
				+ " position : fixed!important;"
				+ " background: transparent!important;"
				+ " border: 1px solid #daa520!important;"
				+ " z-index: 300!important;"
				+ " width: 150px!important;"
				+ " text-align: left!important;"
				+ " vertical-align: middle!important;"
				+ " display: block!important;"
				+ " opacity: 1;"
				+ "}"
				+ ".message_alert_body{"
				+ " display: block!important;"
				+ " min-height: 20px!important;"
				+ " max-height: 150px!important;"
				+ " vertical-align: middle!important;"
				+ " padding: 3px!important;"
				+ "overflow: auto!important;"
				+ "background-color: rgba(255,238,0,0.7)!important;"
				+ "}"
				+ ".message_alert_head{"
				+ " background-color: rgba(255,215,0,0.8)!important;"
				+ " display: block!important;"
				+ " vertical-align: middle!important;"
				+ "height: 20px!important;"
				+ "border-bottom: 1px solid #daa520!important;"
				+ "}"
				+ ".message_alert_capt{"
				+ "float: left!important;"
				+ "width: 130px!important;"
				+ "}"
				// +"#sideBar{position:fixed!important;}"
				+ ".friends_alert_cont{"
				+ " position : fixed!important;"
				+ " background-color: #FFF68F!important;"
				+ " border: 1px solid #8B864E!important;"
				+ " z-index: 300!important;"
				+ " width: 150px!important;"
				+ " text-align: left!important;"
				+ " vertical-align: middle!important;"
				+ " display: block!important;"
				+ " opacity: 1;"
				+ "}"
				+ ".friends_alert_body{"
				+ " display: block!important;"
				+ " min-height: 20px!important;"
				+ " max-height: 150px!important;"
				+ " vertical-align: middle!important;"
				+ " padding: 3px!important;"
				+ "overflow: auto!important;"
				+ "}"
				+ ".friends_alert_head{"
				+ " background-color: #BDB76B!important;"
				+ " display: block!important;"
				+ " vertical-align: middle!important;"
				+ "height: 20px!important;"
				+ "border-bottom: 1px solid #8B864E!important;"
				+ "}"
				+ ".friends_alert_capt{"
				+ "float: left!important;"
				+ "width: 130px!important;"
				+ "}"
				+ ".event_alert_cont{"
				+ " position : fixed!important;"
				+ "color: white;"
				+ " background-color: #FF82AB!important;"
				+ " border: 1px solid #8B475D!important;"
				+ " z-index: 300!important;"
				+ " width: 150px!important;"
				+ " text-align: left!important;"
				+ " vertical-align: middle!important;"
				+ " display: block!important;"
				+ " opacity: 1;"
				+ "}"
				+ ".event_alert_body{"
				+ " display: block!important;"
				+ " min-height: 20px!important;"
				+ " max-height: 150px!important;"
				+ " vertical-align: middle!important;"
				+ " padding: 3px!important;"
				+ "overflow: auto!important;"
				+ "}"
				+ ".event_alert_head{"
				+ " background-color: #CD6889!important;"
				+ " display: block!important;"
				+ " vertical-align: middle!important;"
				+ "height: 20px!important;"
				+ "border-bottom: 1px solid #8B475D!important;"
				+ "}"
				+ ".event_alert_capt{"
				+ "float: left!important;"
				+ "width: 130px!important;"
				+ "}"
				+ ".media_alert_cont{"
				+ " position : fixed!important;"
				+ " background-color: #B3EE3A!important;"
				+ " border: 1px solid #228B22!important;"
				+ " z-index: 300!important;"
				+ " width: 150px!important;"
				+ " text-align: left!important;"
				+ " vertical-align: middle!important;"
				+ " display: block!important;"
				+ " opacity: 1;"
				+ "}"
				+ ".media_alert_body{"
				+ " display: block!important;"
				+ " min-height: 20px!important;"
				+ " max-height: 150px!important;"
				+ " vertical-align: middle!important;"
				+ " padding: 3px!important;"
				+ "overflow: auto!important;"
				+ "}"
				+ ".media_alert_head{"
				+ " background-color: #66CD00!important;"
				+ " display: block!important;"
				+ " vertical-align: middle!important;"
				+ "height: 20px!important;"
				+ "border-bottom: 1px solid #228B22!important;"
				+ "}"
				+ ".media_alert_capt{"
				+ "float: left!important;"
				+ "width: 130px!important;"
				+ "}"
				+ ".alertlink{"
				+ "text-decoration: underline;"
				+ "color: black;"
				+ "font-weight: bold;"
				+ "}"
				+ " .menu_cont{"
				+ " border: 1px solid #B1BDD6!important;"
				+ " margin: 3px 0px 0px 0px!important;"
				+ " padding: 0px 0px 0px 0px!important;"
				+ " background-color: rgba(160,160,160,0.4)!important;"
				+ " position: absolute!important;"
				+ " z-index: 64990!important;"
				+ "}"
				+ " .menu_button{"
				+ " width: 16px!important;"
				+ " height: 16px!important;"
				+ " margin: 0px 0px 0px 4px!important;"
				+ " position: relative!important;"
				+ " padding-right: 5px!important;"
				+ " float: left!important;"
				+ "}"
				+ "#nav li a {"
				+ " background-color:rgba(255,255,255,0.2)!important;"
				+ " border:none!important;"
				+ "}"
				+ "#nav li a:hover {"
				+ "background-color:rgba(220,220,220,0.6)!important;"
				+ " border:none!important;"
				+ "}"
				+ ".leftAd, .leftInfo{"
				+ "padding: 0px!important;"
				+ "}"
				+ ".resBody{"
				+ "position:absolute!important;"
				+ "}"
				+ ".nwHandle{"
				+ " cursor:nw-resize!important;"
				+ "position:absolute!important;"
				+
				// "background-color: #B1BDD6;" +
				"}"
				+ ".nHandle{"
				+ "cursor:n-resize!important;"
				+ "position:absolute!important;"
				+ "border-bottom: 1px solid!important;"
				+ "border-color: #B1BDD6!important;"
				+ "}"
				+ ".neHandle{"
				+ " cursor:ne-resize!important;"
				+ "position:absolute!important;"
				// "background-color: #B1BDD6;" +
				// "border-bottom: 1px solid;" +
				// "border-color: #B1BDD6;" +
				+ "}"
				+ ".eHandle{"
				+ " cursor:e-resize!important;"
				+ "position:absolute!important;"
				// "background-color: #B1BDD6;" +
				+ "border-left: 1px solid!important;"
				+ "border-color: #B1BDD6!important;"
				+ "}"
				+ ".seHandle{"
				+ " cursor:se-resize!important;"
				+ "position:absolute!important;"
				// "background-color: #B1BDD6;" +
				// "border-bottom: 1px solid;" +
				// "border-color: #B1BDD6;" +
				+ "}"
				+ ".sHandle{"
				+ " cursor:s-resize!important;"
				+ "position:absolute!important;"
				// "background-color: #B1BDD6;" +
				+ "border-top: 1px solid!important;"
				+ "border-color: #B1BDD6!important;" + "}"
				+ ".swHandle{"
				+ " cursor:sw-resize!important;"
				+ "position:absolute!important;"
				// "background-color: #B1BDD6;" +
				+ "}" + ".wHandle{" + " cursor:w-resize!important;"
				+ "position:absolute!important;"
				// "background-color: #B1BDD6;" +
				+ "border-right: 1px solid!important;"
				+ "border-color: #B1BDD6!important;" + "}";
	},
	prepareUI : function() {
		function check(arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].id.match(/\d+/)) {
					arr[i].href = "";
					// var id = arr[i].id;
					arr[i].addEventListener("click", function() {
						var url = MigScript.CSS_HOST + "/getcss.php?id="
								+ this.id;
						GM_xmlhttpRequest({
							method : "GET",
							url : url,
							onreadystatechange : function(o) {
								if (o.readyState == 4) {
									var x = null;
									try {
										x = eval("(" + o.responseText + ")");
										alert(x.error);
									} catch (e) {

									}

									if (x == null || !x.error) {
										MigScript.Settings.local_settings = MigScript.Util
												.deserialize("local_settings",
														[]);
										MigScript.Settings.local_settings[8] = o.responseText;
										MigScript.Util
												.serialize(
														"local_settings",
														MigScript.Settings.local_settings);
										alert("Скин установлен!");
									} else {
										alert("Ошибка установки!");
									}
								}
							}
						});
					}, true);
				}
			}
		}

		if (MigScript.Util.checkLocation("catalog")) {
			// console.log("catalog");
			// var arr = document.getElementsByTagName("a");
			// console.log(arr);
			// check(arr);

			MigScript.DomUtil.ge("content").addEventListener("DOMNodeInserted",
					function(e) {
						var arr = e.target.getElementsByTagName("a");
						// console.log(arr
						check(arr);
					}, true);
		}

		// alert(MigScript.myUid);
	},

	init : function() {
		if (MigScript.Settings.local_settings != null
				&& MigScript.Settings.local_settings != 'undefined'
				&& MigScript.Settings.local_settings.length > 9) {
			MigScript.ustyle = MigScript.Settings.local_settings[8];
		}
		if (MigScript.ustyle == null) {
			MigScript.ustyle = MigScript.Styler.getDefaultStyle();
		}

		// Если мы не используем стиль, то используем желтый скин для модуля
		// слежения
		if (MigScript.Settings.local_settings[7]) {
			GM_addStyle(MigScript.ustyle);
		}

		// Внутренние стили скрипта, добавляются в любом случае
		GM_addStyle(" #hider{" + " top: 0px;" + " left: 0px;"
				+ " visibility: visible;" + " z-index : 1900;"
				+ "	background-color: #0000ff;" + " opacity: 0.3;"
				+ " position: absolute;" + " width: 100%;" + " }" + "					"
				+ "#general #buttons{" + "	padding-right: 0px;"
				+ " float: none;" + "}" + " #buttons{" + " border: 0px;"
				+ " position: relative;" + " display: block;"
				+ " width: 500px;" + "}" + "					" + " .vkbtn{"
				+ " display: inline;" + " }" + "					" + " #s_table{"
				+ " border: 0px;" + " padding: 10px;" + " position: relative;"
				+ " width: 600px;" + "}" + "					" + " #s_table tr{"
				+ " border: 0px;" + " width: 20px;" + "}" + " .td0{"
				+ " border: 0px;" + " width: 300px;" + "}" + " .td1{"
				+ " border: 0px;" + " width: 100px;" + " text-align: right;"
				+ "}" + "					" + " .config_input{" + " width: 60px;"
				+ " background-color: rgba(255,255,255,0.4);"
				+ " text-align: center;" + " font-size: 16pt;" + "color: navy;"
				+ " margin-left: 50px;" + "}" + "					" + ".c_link{"
				+ " width : 100px;" + " display: inline-block;" + "}" + "					"
				+ " .cross{" + " display: inline;" + " position: relative;"
				+ "float:right;" + " cursor: pointer;" + "}" + "					"
				+ " #sett_cont{" + " color: #ffffff;" + " display: inline;"
				+ " position: absolute;" + " left: 160px;" + " top: 10px;"
				+ "}" + "					" + "}" + "					" + " #sett_img{"
				+ " position: relative;" + " width: 16px;" + " top: 3px;"
				+ " left: 3px;" + " cursor: pointer;" + "}" + "					"
				+ MigScript.Styler.getZeroStyle());

	}

};

MigScript.Util = {
	sNum : function(i, j) {
		if (i.n < j.n) {
			return -1;
		} else if (i.n > j.n) {
			return 1;
		} else {
			return 0;
		}
	},
	extend : function() {

		var isFunction = function(obj) {
			return Object.prototype.toString.call(obj) === "[object Function]";
		};

		var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}

		if (typeof target !== "object" && !isFunction(target))
			target = {};

		if (length == i) {
			return target;
		}

		for (; i < length; i++)
			if ((options = arguments[i]) != null)
				for (var name in options) {
					var src = target[name], copy = options[name];

					if (target === copy)
						continue;

					if (deep && copy && typeof copy === "object"
							&& !copy.nodeType)
						target[name] = extend(deep, src
										|| (copy.length != null ? [] : {}),
								copy);

					else if (copy !== undefined)
						target[name] = copy;
				}
		return target;
	},

	getCookie : function(cname) {
		// first we'll split this cookie up into name/value pairs
		// note: document.cookie only returns name=value, not the other
		// components
		var a_all_cookies = document.cookie.split(';');
		var a_temp_cookie = '';
		var cookie_name = '';
		var cookie_value = '';
		var b_cookie_found = false; // set boolean t/f default f

		for (var i = 0; i < a_all_cookies.length; i++) {
			// now we'll split apart each name=value pair
			a_temp_cookie = a_all_cookies[i].split('=');

			// and trim left/right whitespace while we're at it
			cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

			// if the extracted name matches passed check_name
			if (cookie_name == cname) {
				b_cookie_found = true;
				// we need to handle case where cookie has no value but exists
				// (no = sign, that is):
				if (a_temp_cookie.length > 1) {
					cookie_value = unescape(a_temp_cookie[1].replace(
							/^\s+|\s+$/g, ''));
				}
				// note that in cases where cookie is initialized but no value,
				// null is returned
				return cookie_value;
			}
			a_temp_cookie = null;
			cookie_name = '';
		}
		if (!b_cookie_found) {
			return null;
		}
	},
	decodeHash : function(_) {
		_ = _.substr(_.length - 5) + _.substr(4, _.length - 12);
		var ___ = '';
		for (____ = 0; ____ < _.length; ++____) {
			___ += _.charAt(_.length - ____ - 1)
		}
		return ___;
	},
	arraySort : function(a, b) {
		if (a[1] < b[1]) {
			return -1;
		}
		if (a[1] > b[1]) {
			return 1;
		}
		return 0;
	},
	notNullCount : function(arr) {
		if (arr) {
			var j = 0;
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] != null) {
					j++;
				}
			}
			return j;
		} else {
			return 0;
		}
	},
	checkLocation : function(str) {
		var rx = new RegExp(str);
		var res = rx.exec(window.location.href);
		if (res) {
			return res.toString();
		}
	},
	getMyUid : function() {
		var id = GM_getValue("id", 0);
		var nid;
		try {
			var base = MigScript.DomUtil.ge("myprofile");
			var anchs = base.getElementsByTagName("a");
			var str = anchs[1].getAttribute("href");
			if (str != null && str.match(/\/id/)) {
				str = str.replace(/\?|\#/g, '');
				nid = str.substring(str.indexOf("/id") + 3);
			}
			if (nid != id) {
				GM_setValue("id", nid);
				return nid;
			} else {
				GM_setValue("id", id);
				return id;
			}
		} catch (e) {
			return id;
		}
	},
	trimList : function(l) {
		if (l) {
			var newList = [];
			for (var i = 0; i < l.length; i++) {
				if (l[i] != null) {
					newList.push(l[i]);
				}
			}
			// MigScript.log("newList " + newList);
			return newList;
		} else {
			return null;
		}
	},
	checkPeriod : function(timeSource, period) {
		var lastupdate = MigScript.Util.deserialize(timeSource, 0);
		var now = new Date().getTime();

		// MigScript.log("lu " +lastupdate);
		var dif = (now - lastupdate);
		// MigScript.log("dif " +dif);
		// alert(MigScript.OnlineFriends.checkPeriod);
		if ((dif >= period) || (dif <= -period)) {
			MigScript.Util.serialize(timeSource, now);
			return true;
		} else {
			return false;
		}
	},
	serialize : function(container, source) {
		// MigScript.log("src unevaled: " + uneval(source));
		var str = MigScript.myUid + "_" + container;
		// MigScript.log(str);
		GM_setValue(str, uneval(source));
	},
	deserialize : function(container, defaultValue) {
		// MigScript.log(MigScript.myUid + "_" + container);
		var value;
		if (defaultValue != null) {
			value = GM_getValue(MigScript.myUid + "_" + container, defaultValue);
			MigScript.log(container + " value is " + value);
			if (value == "" || value == null || value == "null") {
				value = defaultValue;
				MigScript.log(container + " value set to default "
						+ defaultValue);
			}
		} else {
			value = GM_getValue(MigScript.myUid + "_" + container, null);
			MigScript.log(container + " value is " + value);
		}
		return eval(value);
	},
	foreignRequest : function(url, onDone) {
		MigScript.log("Request sent to " + url);
		GM_xmlhttpRequest({
					method : "GET",
					url : url,
					onreadystatechange : function(o) {
						if (o.readyState == 4) {
							if (onDone) {
								MigScript.log("Response from " + url
										+ " received");
								onDone(o.responseText);
							}

						}
					}
				});
	}
};

MigScript.DomUtil = {
	ge : function() {
		var ea;
		for (var i = 0; i < arguments.length; i++) {
			var e = arguments[i];
			if (typeof e == 'string') {
				e = document.getElementById(e);
			}
			if (arguments.length == 1) {
				return e;
			}
			if (!ea) {
				ea = [];
			}
			ea.push(e);
		}
		return ea;
	},
	getDescendantById : function(p, id) {
		if (typeof(p) == "string") {
			p = document.getElementById(p);
		}
		if (p == null) {
			return;
		}
		var c = p.childNodes;
		for (var i = 0; i < c.length; i++) {
			if (c[i].id == id) {
				return c[i];
			} else {

				if (c[i].childNodes.length > 0) {
					var d = MigScript.DomUtil.getDescendantById(c[i], id);
				}
				if (d) {
					return d;
				}
			}
		}
	},

	dc : function(tag) {
		return document.createElement(tag);
	},
	absLeft : function(element) {
		if (typeof(element) == "string") {
			element = document.getElementById(element);
		}
		if (element == null) {
			return;
		}
		var xPos = element.offsetLeft;
		var tempEl = element.offsetParent;
		while (tempEl != null) {
			xPos += tempEl.offsetLeft;
			tempEl = tempEl.offsetParent;
		}
		return xPos;

	},
	absTop : function(element) {
		if (typeof(element) == "string") {
			element = document.getElementById(element);
		}
		if (element == null) {
			return;
		}
		var yPos = element.offsetTop;
		var tempEl = element.offsetParent;
		while (tempEl != null) {
			yPos += tempEl.offsetTop;
			tempEl = tempEl.offsetParent;
		}
		return yPos;
	},
	geByClass : function(searchClass, node, tag) {
		var classElements = [];
		if (node == null) {
			node = document;
		}
		if (tag == null) {
			tag = '*';
		}
		if (node.getElementsByClassName) {
			classElements = node.getElementsByClassName(searchClass);
			if (tag != '*') {
				for (i = 0; i < classElements.length; i++) {
					if (classElements.nodeName == tag) {
						classElements.splice(i, 1);
					}
				}
			}
			return classElements;
		}
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
		for (var i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	},

	toggle : function(elem) {
		if (elem.style.display == "none") {
			elem.style.display = "inherit";
		} else {
			elem.style.display = "none";
		}

	},

	removeChildNodes : function(elem) {
		var cycle_length = elem.childNodes.length;
		for (var i = 0; i < cycle_length; i++) {
			// MigScript.DomUtil.removeChildNodes(elem.childNodes[0]);
			elem.removeChild(elem.childNodes[0]);
		}
	},
	insertAfter : function(insert_node_id, after_node_id) {
		var insertA = MigScript.DomUtil.ge(after_node_id);
		var insertWhat = MigScript.DomUtil.ge(insert_node_id);
		insertA.parentNode.insertBefore(insertWhat, insertA.nextSibling);
	},
	highlight : function(elem) {
		elem.className += "_h";
	},

	unlight : function(elem) {
		elem.className = elem.className.substring(0, elem.className
						.indexOf("_h"));
	},

	addHighlighting : function(elem) {
		elem.addEventListener("mouseover", function() {
					MigScript.DomUtil.highlight(this);
				}, true);
		elem.addEventListener("mouseout", function() {
					MigScript.DomUtil.unlight(this);
				}, true);
	},

	// TODO
	hide : function(elem) {
		if (typeof(elem) == "string") {
			elem = document.getElementById(elem);
		}
		if (elem == null) {
			return;
		}
		if (MigScript.DomUtil.ge(elem) != null) {
			MigScript.DomUtil.ge(elem).style.setProperty("display", "none",
					"important");
		}
	},

	show : function(elem) {
		if (typeof(elem) == "string") {
			elem = document.getElementById(elem);
		}
		if (elem == null) {
			return;
		}
		if (MigScript.DomUtil.ge(elem) != null) {
			MigScript.DomUtil.ge(elem).style.setProperty("display", "block",
					"important");
		}
	},

	appendDiv : function(to_id, what_id) {
		var _parent = MigScript.DomUtil.ge(to_id);
		var el = MigScript.DomUtil.dc("div");
		el.id = what_id;
		_parent.appendChild(el);
		return el;
	}

};

MigScript.Friends = {
	getFriends : function(onDone, onFail) {
		MigScript.Ajax.ajax = new MigScript.Ajax.AjaxClass(function(a, r) {
					r = eval("(" + r + ")");
					// fr лежит в ответе
					MigScript.Friends.friendList = r.friends;
					if (onDone != null) {
						onDone();
					}
				}, function() {
					if (onFail != null) {
						onFail();
					}
				});
		MigScript.Ajax.ajax.get("/friends.php?id=" + MigScript.myUid);
	},
	getFavFriends : function(onDone) {
		MigScript.Ajax.ajax = new MigScript.Ajax.AjaxClass(function(a, r) {
			var all_id = r.match((/href=\"\/id\d+/g));
			for (var l = 0; l < all_id.length; l++) {
				all_id[l] = all_id[l].toString();
				all_id[l] = all_id[l].substring("href=\"\/id".length);
			}
			for (var j = 0; j < all_id.length; j++) {
				for (var k = 0; k < all_id.length; k++) {
					if (((all_id[j] == all_id[k]) || (all_id[j] == MigScript.myUid))
							&& (j != k)) {
						all_id[j] = null;
					}
				}
			}
			MigScript.Friends.favFriends = MigScript.Util.trimList(all_id);
			MigScript.Util.serialize("favFriendsList",
					MigScript.Friends.favFriends);
			// MigScript.log("afterTrim: " + all_id);

			if (onDone != null) {
				onDone();
			}
		}, function() {
			if (onFail != null) {
				onFail();
			}
		});
		MigScript.Ajax.ajax.get("/fave.php");
	},
	friendList : [],
	favFriends : [],
	isFriend : function(uid) {
		// MigScript.log(MigScript.Friends.friendList.length);
		for (var i = 0; i < MigScript.Friends.friendList.length; i++) {
			if (uid == MigScript.Friends.friendList[i][0]) {
				return true;
			}
		}
		return false;
	},
	isFavFriend : function(fid) {
		if (MigScript.Friends.favFriends) {
			for (var i = 0; i < MigScript.Friends.favFriends.length; i++) {
				if (MigScript.Friends.favFriends[i] == fid) {
					return true;
				}
			}
		}
		return false;
	},
	init : function() {
		MigScript.Friends.friendList = MigScript.Util.deserialize("lastList",
				[]);
		MigScript.Friends.favFriends = MigScript.Util.deserialize(
				"favFriendsList", []);
		// MigScript.Friends.friendList = ((MigScript.Friends.friendList.length
		// > 0) ? MigScript.Friends.friendList :
		// MigScript.Friends.getFriends());
		// MigScript.Friends.favFriends = ((MigScript.Friends.favFriends.length
		// > 0) ? MigScript.Friends.favFriends :
		// MigScript.Friends.getFavFriends());
		if (MigScript.Friends.friendList.length == 0) {
			MigScript.Friends.friendList = MigScript.Friends.getFriends();
		}
		if (MigScript.Friends.favFriends.length == 0) {
			MigScript.Friends.favFriends = MigScript.Friends.getFavFriends();
		}
	}
};

MigScript.ExFriends = {

	getExList : function() {
		var _exFriends = MigScript.Util.deserialize("exFriends", "[]");
		MigScript.log("ex " + _exFriends.length);
		return MigScript.Util.trimList(_exFriends);
	},
	checkFriends : function() {
		// MigScript.log("cf");
		if (MigScript.Util.checkPeriod("last_checked",
				MigScript.Settings.local_settings[3] * 60 * 1000)) {

			MigScript.Friends.getFriends(MigScript.ExFriends.checkLists);
			// lastChecked = new Date().toGMTString();
			// MigScript.Util.serialize("last_checked", lastChecked);
			setTimeout(function() {
						MigScript.ExFriends.checkFriends();
					}, MigScript.Settings.local_settings[3] * 60 * 1000);
		}
	},
	forceCheckFriends : function(callback) {
		var lastChecked = new Date(MigScript.Util
				.deserialize("last_checked", 0)).getTime();
		MigScript.ExFriends.exFriends = MigScript.ExFriends.getExList();
		MigScript.Friends.getFriends(function() {
					MigScript.ExFriends.checkLists();
					if (callback) {
						callback();
					};
				});
	},
	checkLists : function() {
		if (MigScript.Friends.friendList.length != 0) {
			// MigScript.log("checkLists");

			var lastFriendList = MigScript.Util.deserialize("lastList", []);
			// MigScript.log(lastFriendList);
			/*
			 * if (MigScript.UI.ExFriends.isShown) {
			 * MigScript.DomUtil.ge("fr_txt").innerHTML = "В списке друзей всё
			 * спокойно"; }
			 */

			for (var i = 0; i < lastFriendList.length; i++) {
				for (var j = 0; j < MigScript.Friends.friendList.length; j++) {
					if (lastFriendList[i][0] == MigScript.Friends.friendList[j][0]) {
						lastFriendList[i] = null;
						break;
					}
				}
			}
			for (i = 0; i < lastFriendList.length; i++) {
				if (lastFriendList[i] != null) {
					MigScript.ExFriends.exFriends.push(lastFriendList[i]);
				}
			}
			MigScript.ExFriends.exFriends = MigScript.Util
					.trimList(MigScript.ExFriends.exFriends);
			lastFriendList = MigScript.Friends.friendList;
			MigScript.Util.serialize("lastList", lastFriendList);
			MigScript.Util
					.serialize("exFriends", MigScript.ExFriends.exFriends);
		}
	},
	init : function() {
		MigScript.ExFriends.exFriends = MigScript.ExFriends.getExList();
		MigScript.ExFriends.checkFriends();
	}
};

MigScript.OnlineFriends = {
	onlineFriends : null,
	oldOnlineFriends : null,
	checkPeriod : null,
	newOnlineFriends : null,
	getOnlineFriends : function(onDone) {

		if (MigScript.Util.checkPeriod("onlUpdTime",
				MigScript.OnlineFriends.checkPeriod)) {
			MigScript.Ajax.ajax = new MigScript.Ajax.AjaxClass(function(a, r) {
						var resp = eval("(" + r + ")");
						MigScript.OnlineFriends.onlineFriends = resp.friends;
						MigScript.OnlineFriends.onlineFriends
								.sort(MigScript.Util.arraySort);
						MigScript.log(MigScript.OnlineFriends.onlineFriends);
						MigScript.Util.serialize("onlFriends", resp.friends);
						MigScript.OnlineFriends.checkNewFriends();

						setTimeout(function() {
									MigScript.OnlineFriends.getOnlineFriends(
											function() {
												MigScript.UI.OnlineFriends
														.notifyNumber();
												MigScript.UI.OnlineFriends
														.addPeople();
											});
								}, MigScript.OnlineFriends.checkPeriod);
						if (onDone != null) {
							onDone();
						}
					}, function() {
						if (onFail != null) {
							onFail();
						}
					});
			MigScript.Ajax.ajax.get("/friends.php?id=" + MigScript.myUid
					+ "&filter=online");
		} else {

			setTimeout(function() {
						MigScript.OnlineFriends.getOnlineFriends(function() {
									MigScript.UI.OnlineFriends.notifyNumber();
									MigScript.UI.OnlineFriends.addPeople();
								});
					}, MigScript.OnlineFriends.checkPeriod);
			if (onDone != null) {
				onDone();
			}
		}
	},
	checkNewFriends : function() {
		MigScript.OnlineFriends.newOnlineFriends = [];
		MigScript.log("start checking new online friends");
		var flag = true;
		for (var i = 0; i < MigScript.OnlineFriends.onlineFriends.length; i++) {
			flag = true;
			for (var j = 0; j < MigScript.OnlineFriends.oldOnlineFriends.length; j++) {
				if (MigScript.OnlineFriends.onlineFriends[i][0] == MigScript.OnlineFriends.oldOnlineFriends[j][0]) {
					flag = false;
					break;
				}
			}
			if (flag) {
				MigScript.OnlineFriends.newOnlineFriends
						.push(MigScript.OnlineFriends.onlineFriends[i]);
			}
		}
		MigScript.log("online friends lists compared");

		MigScript.OnlineFriends.oldOnlineFriends = MigScript.OnlineFriends.onlineFriends;
		MigScript.log("newonline list length: "
				+ MigScript.OnlineFriends.newOnlineFriends.length);

		for (var k = 0; k < MigScript.OnlineFriends.newOnlineFriends.length; k++) {
			MigScript.log(MigScript.OnlineFriends.newOnlineFriends[k][1]);
			if (MigScript.Settings.local_settings[18]
					&& !MigScript.Settings.local_settings[40]) {
				MigScript
						.alert(
								"<b>В сети<b>",
								"<b><a target='_blank' href='"
										+ MigScript.HOST
										+ "/id"
										+ MigScript.OnlineFriends.newOnlineFriends[k][0]
										+ "'>"
										+ MigScript.OnlineFriends.newOnlineFriends[k][1]
										+ "</a></b> сейчас онлайн!");
				if (MigScript.Settings.local_settings[29]) {
					MigScript.Sound.play(MigScript.Sound.onlineSound());
				}
			} else if (MigScript.Settings.local_settings[40]
					&& MigScript.Friends
							.isFavFriend(MigScript.OnlineFriends.newOnlineFriends[k][0])) {
				MigScript
						.alert(
								"<b>В сети<b>",
								"<b><a target='_blank' href='"
										+ MigScript.HOST
										+ "/id"
										+ MigScript.OnlineFriends.newOnlineFriends[k][0]
										+ "'>"
										+ MigScript.OnlineFriends.newOnlineFriends[k][1]
										+ "</a></b> сейчас онлайн!");
				if (MigScript.Settings.local_settings[29]) {
					MigScript.Sound.play(MigScript.Sound.onlineSound());
				}
			}

		}
	},
	init : function() {
		MigScript.OnlineFriends.onlineFriends = MigScript.Util.deserialize(
				"onlFriends", "[]");

		MigScript.OnlineFriends.onlineFriends.sort(MigScript.Util.arraySort);

		MigScript.OnlineFriends.oldOnlineFriends = MigScript.OnlineFriends.onlineFriends;
		MigScript.OnlineFriends.checkPeriod = MigScript.Settings.local_settings[13]
				* 1000;
		MigScript.OnlineFriends
				.getOnlineFriends(MigScript.UI.OnlineFriends.init);
	}

};

MigScript.Photo = {
	markAll : function() {

		function getPhotoInfo() {
			var res = /([0-9\-]+)_(\d+)/.exec(location.href);
			if (res) {
				return {
					"mid" : res[1],
					"pid" : res[2]
				};
			} else {
				return {
					"mid" : 0,
					"pid" : 0
				};
			}
		}

		var info = getPhotoInfo();
		var pid = info.pid, mid = info.mid;

		function mark() {
			p_mark(0);
		}

		function p_mark(i) {
			if (i >= MigScript.Friends.friendList.length) {
				MigScript.UI.Dialog
						.showBlock("<font color='#00f'>Все друзья отмечены!!</font><br>Ждите перезагрузки страницы!");
				// clearTimeout(timerID);
				setTimeout(function() {
							window.location.reload();
						}, 10);
				return;
			}
			var uri = "/photos.php";

			var params = {
				act : "put",
				pid : mid + "_" + pid,
				id : mid,
				oid : 0,
				subject : MigScript.Friends.friendList[i][0],
				name : encodeURIComponent(MigScript.Friends.friendList[i][1]),
				add : 1,
				x : 0,
				y : 0,
				x2 : 100,
				y2 : 100
			};

			MigScript.Ajax.ajax.postWithCaptcha(uri, params, {
						onSuccess : function() {

							MigScript.UI.Dialog.showBlock("<font color='#00f'>"
									+ (i + 1)
									+ "</font> из <font color='#F00'>"
									+ MigScript.Friends.friendList.length
									+ "</font> друзей отмечено!");

							p_mark(i + 1);
						}
					});
		}

		if (!confirm("Вы точно хотите отметить ВСЕХ друзей?")) {
			return;
		}
		MigScript.UI.Dialog.getDialog("Отмечаем друзей", false, function() {
					window.location.reload();
				});
		MigScript.UI.getOpaqueBg();
		MigScript.UI.Dialog
				.showBlock("Обработка <img src=\"http://vkontakte.ru/images/upload.gif\"><br /> Ждите...");
		if (MigScript.Friends.friendList != null) {
			p_mark(0);
		} else {
			MigScript.Friends.getFriends(mark);
		}
	},

	deleteAllMarks : function() {
		var timer;
		var forDel = [];
		var pid = MigScript.Photo.getPhotoId();
		var ttlMarks = MigScript.Photo.getTotalMarksNumber();
		var nodes = MigScript.DomUtil.ge("phototags").getElementsByTagName("a");

		function deleteMark(i) {
			if (forDel.length > i) {
				MigScript.UI.Dialog.showBlock("Удаляю <font color='#00f'>"
						+ (i + 1) + " </font> из <font color='#f00'>"
						+ ttlMarks + " </font> отметок");
				var uri = "/photos.php";
				MigScript.Ajax.ajax.postWithCaptcha(uri, {
							'act' : "put",
							'pid' : pid,
							'tag_id' : forDel[i]
						}, {
							onSuccess : function() {
								deleteMark(++i);
							}
						});
			} else {
				MigScript.UI.Dialog
						.showBlock("<font color='#00f'>Все отметки удалены!!</font><br>Ждите перезагрузки страницы!");
				timer = setTimeout(function() {
							window.location.reload();
						}, 3000);
			}
		}

		if (confirm("Точно удалить ВСЕ отметки ??")) {
			for (var i = 0; i < nodes.length; i++) {
				var str = nodes[i].getAttribute("onclick");
				if (str != null && str.match(/tagger/)) {
					var tag_id = str.match(/\d+/);
					forDel.push(tag_id);
				}
			}
			MigScript.UI.getOpaqueBg();
			MigScript.UI.Dialog.getDialog("Удаляем все отметки", false,
					function() {
						window.location.reload();
					});
			deleteMark(0);
		}

	},

	getPhotoId : function() {
		return location.href.match(/\d+_\d+/);
	},

	getTotalMarksNumber : function() {
		var j = 0;
		var nodes;
		if (MigScript.DomUtil.ge("phototags") != null) {
			nodes = MigScript.DomUtil.ge("phototags").getElementsByTagName("a");
		}
		if (nodes != null) {
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].getAttribute("onclick") != null
						&& nodes[i].getAttribute("onclick").match(/tagger/)) {
					j += 1;
				}
			}
		}
		return j;
	},

	confirmAll : function() {
		var confirm = function(pid) {
			(new MigScript.Ajax.AjaxClass()).post(
					"/photos.php?act=a_confirm_tag", "id=" + pid);
		};

		var album = MigScript.DomUtil.ge("album");
		var a = album.getElementsByTagName("a");
		for (var i = 0; i < a.length; i++) {
			var pid = a[i].href.match(/\d+_\d+/);
			if (pid) {
				confirm(pid.toString());
			}
		}
		MigScript.UI.Dialog.getDialog("Подтверждение завершено", true);
		MigScript.UI.Dialog
				.showTxt("Вы подтвердили, что присутствуете на всех фотографиях!");
		MigScript.DomUtil.ge("dlg_ok_btn").addEventListener("click",
				function() {
					window.location.reload();
				}, true);

	}

};

MigScript.Video = {
	getVideoUrl : function(text) {
		var vtag = /vtag:.(.*?).,/.exec(text);
		var vkid = /vkid:.(.*?).,/.exec(text);
		var host = /host:.(.*?).,/.exec(text);
		var uid = /uid:..(.*?).,/.exec(text);

		if (vtag && vkid && host) {
			// Если хост содержит тока цифры - это плохой хост =)
			// console.log(vtag[1]);
			// console.log(vkid[1]);
			// console.log(host[1]);
			// console.log(uid[1]);

			if (!host[1].match(/[^\d+]/)) {
				return "http://cs" + host[1] + ".vkontakte.ru/u" + uid[1]
						+ "/video/" + vtag[1] + ".flv";
			}

			return "http://" + host[1] + "/assets/videos/" + vtag[1] + vkid[1]
					+ ".vk.flv";
		} else {
			return null;
		}
	},

	markAll : function() {
		function v_mark() {
			mark(0);
		}

		function mark(i) {
			if (i >= MigScript.Friends.friendList.length) {
				MigScript.UI.Dialog
						.showBlock("<font color='#00f'>Все друзья отмечены!!</font><br>Ждите перезагрузки страницы!");
				// clearTimeout(timerID);
				setTimeout(function() {
							window.location.reload();
						}, 10);
				return;
			}
			var vid = MigScript.DomUtil.ge("video_id").value;
			var uri = "/video.php";
			MigScript.Ajax.ajax.postWithCaptcha(uri, {
				'act' : 'aaddtag',
				'fid' : MigScript.Friends.friendList[i][0],
				'oid' : MigScript.myUid,
				'text' : encodeURIComponent(MigScript.Friends.friendList[i][1]),
				'vid' : vid
			}, {
				onSuccess : function() {
					MigScript.UI.Dialog.showBlock("<font color='#00f'>"
							+ (i + 1) + "</font> из <font color='#F00'>"
							+ MigScript.Friends.friendList.length
							+ "</font> друзей отмечено!");
					mark(i + 1);
				}
			});
		}

		if (!confirm("Вы точно хотите отметить ВСЕХ друзей?")) {
			return;
		}
		MigScript.UI.Dialog.getDialog("Отмечаем друзей", false, function() {
					window.location.reload();
				});
		MigScript.UI.getOpaqueBg();
		MigScript.UI.Dialog
				.showBlock("Обработка <img src=\"http://vkontakte.ru/images/upload.gif\"><br /> Ждите...");
		if (MigScript.Friends.friendList != null) {
			mark(0);
		} else {
			MigScript.Friends.getFriends(v_mark);
		}
	},
	deleteAllMarks : function() {
		var timer;
		var forDel = [];
		var vid = MigScript.DomUtil.ge("video_id").value;
		var ttlMarks = MigScript.Video.getTotalMarksNumber();
		var nodes = MigScript.DomUtil.ge("tagsCont").getElementsByTagName("a");

		function deleteMark(i) {
			if (forDel.length > i) {
				MigScript.UI.Dialog.showBlock("Удаляю <font color='#00f'>"
						+ (i + 1) + " </font> из <font color='#f00'>"
						+ ttlMarks + " </font> отметок");
				var uri = "/video.php";
				MigScript.Ajax.ajax.postWithCaptcha(uri, {
							'act' : "adeletetag",
							'oid' : MigScript.myUid,
							'tag_id' : forDel[i],
							'vid' : vid
						}, {
							onSuccess : function() {
								deleteMark(++i);
							}
						});
			} else {
				MigScript.UI.Dialog
						.showBlock("<font color='#00f'>Все отметки удалены!!</font><br>Ждите перезагрузки страницы!");
				timer = setTimeout(function() {
							window.location.reload();
						}, 3000);
			}
		}

		if (confirm("Точно удалить ВСЕ отметки ??")) {
			for (var i = 0; i < nodes.length; i++) {
				var str = nodes[i].getAttribute("onclick");
				if (str != null && str.match(/removeTag/)) {
					var tag_id = str.match(/\d+/);
					forDel.push(tag_id);
				}
			}
			MigScript.UI.getOpaqueBg();
			MigScript.UI.Dialog.getDialog("Удаляем все отметки", false,
					function() {
						window.location.reload();
					});
			deleteMark(0);
		}
	},
	getTotalMarksNumber : function() {
		var j = 0;
		var nodes;
		if (MigScript.DomUtil.ge("tagsCont") != null) {
			nodes = MigScript.DomUtil.ge("tagsCont").getElementsByTagName("a");
		}
		if (nodes != null) {
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].getAttribute("onclick") != null
						&& nodes[i].getAttribute("onclick").match(/removeTag/)) {
					j += 1;
				}
			}
		}
		return j;
	}
};

MigScript.Audio = {
	doubles : null
};

MigScript.Sound = {
	onlineSound : function() {
		return "";
	},
	messageSound : function() {

		return "";
	},
	notifySound : function() {
		return "";
	},
	play : function(src) {
		if (MigScript.Settings.local_settings[15]) {
			var audio = MigScript.DomUtil.ge("audio_cont");
			if (audio) {
				document.body.removeChild(audio);
			}
			audio = MigScript.DomUtil.dc("audio");
			audio.id = "audio_cont";
			audio.setAttribute("autoplay", true);
			audio.src = src;
			document.body.appendChild(audio);
		}
	},
	init : function() {
		var audio = MigScript.DomUtil.ge("audio_cont");
		if (audio == null) {
			audio = MigScript.DomUtil.dc("audio");
			audio.id = "audio_cont";
			audio.setAttribute("autoplay", true);
			// audio.src = MigScript.Sound.onlineSound();
			document.body.appendChild(audio);
		}
	}
};

MigScript.Group = {
	ajax : new MigScript.Ajax.AjaxClass(),
	isAdmin : function() {
		return MigScript.DomUtil.ge("section4") != null;
	},

	callFriends : function() {
		MigScript.DomUtil.ge("gr_frCall").innerHTML = "<center><img src=\""
				+ MigScript.UI.Images.loaderImg() + "\"/></center>";

		function doCallFriends() {
			MigScript.Group.ajax.get(window.location.href);
			MigScript.Group.ajax.onDone = function(a, r) {
				var hash = /hash: decodehash\(\'.+\'\)/.exec(r).toString();
				hash = hash.substring(18, hash.lastIndexOf("'"));
				hash = MigScript.Util.decodeHash(hash);
				console.log(hash);

				var _gid = window.location.href.match(/club\d+/);
				_gid = _gid.toString().substring(4);

				var stack = function(offset) {
					var fids = [];
					var j = 0;
					try {
						for (var i = offset; i < offset + 20; i++) {

							fids[j] = MigScript.Friends.friendList[i][0];
							j++;

							// MigScript.log(fids[i - 1]);
						}
					} catch (e) {

					} finally {
						MigScript.Group.ajax.postWithCaptcha(
								"groups_ajax.php?act=a_invite_friends", {
									friends : fids.join(","),
									gid : _gid,
									hash : hash
								},{
									onSuccess: MigScript.Group.ajax.onDone
								});
					}

				};

				var cnt = 0;
				var k = 0;
				stack(0);

				MigScript.Group.ajax.onDone = function(a, _r) {
					// MigScript.log(_r);
					_r = eval("(" + _r + ")");
					MigScript.DomUtil.ge("gr_frCall").innerHTML = "<b>Пригласить всех друзей</b>";
					var rtext;
					console.log(_r);
					if (_r.result != null) {
						cnt += _r.result;
						rtext = "Приглашено: " + cnt + " человек";
					} else if (_r.error != null) {
						rtext = "Ошибочка вышла...";
					}

					MigScript.DomUtil.ge("gr_frCall").innerHTML = rtext;
					k++;
					if (k < MigScript.Friends.friendList.length / 20) {
						stack(k * 20);
					}
				};

			};
		}

		MigScript.Friends.getFriends(doCallFriends);
	},

	kickNoFriends : function() {
		if (MigScript.Friends.friendList == null) {
			MigScript.Friends.getFriends(MigScript.Group.kickNoFriends);
		} else {
			if (!confirm("Из группы будут выгнаны все те, кто на данной странице не является вашим другом. Начнём ??")) {
				return;
			}
			var divs = document.getElementById("membersContainer")
					.getElementsByTagName("div");
			var gid = window.location.href.match(/gid=\d+/).toString();
			gid = gid.match(/\d+/).toString();
			for (var i = 0; i < divs.length; i++) {
				if (/memRow/.exec(divs[i].id)) {
					var pid = divs[i].id.slice(6);

					var arr = divs[i].getElementsByTagName("a")[2];
					var str = arr.getAttribute("onclick");
					var hash;
					if (str != null) {
						hash = str.match(/\'\w*\'/).toString();
						hash = hash.match(/\w+/).toString();
					} else {
						hash = null;
					}
					var flag = true;
					for (var j = 0; j < MigScript.Friends.friendList.length; j++) {
						if (MigScript.Friends.friendList[j][0] == pid)
							flag = false;
					}

					if (flag && pid.length > 0) {
						MigScript.Group.deleteMember(pid, gid, hash);

					}
				}

			}

		}
	},
	deleteMember : function(pid, gid, hash) {
		MigScript.Ajax.ajax.post(MigScript.HOST + "/groups_ajax.php", {
					act : "a_delete_member",
					gid : gid,
					id : pid,
					hash : hash
				});
		MigScript.Ajax.ajax.onDone = function(r) {
			// MigScript.log(r.toString());
			eval(r);
			if (result != null) {
				// MigScript.log(result);
				MigScript.DomUtil.ge("memRow" + pid).style.visibility = "none";
			}
		};
	}
};

MigScript.Bookmarks = {
	bookAction : function(uid) {
		MigScript.Friends.favFriends.push(uid);
		MigScript.log("friend bookmarked");
		MigScript.Util
				.serialize("favFriendsList", MigScript.Friends.favFriends);
		MigScript.UI.placeBookmarkStubs();
		MigScript.UI.OnlineFriends.createList();
		MigScript.Bookmarks.syncAdd(uid);
	},
	unbookAction : function(uid) {
		for (var i = 0; i < MigScript.Friends.favFriends.length; i++) {
			if (MigScript.Friends.favFriends[i] == uid) {
				MigScript.Friends.favFriends[i] = null;
			}
		}
		MigScript.Friends.favFriends = MigScript.Util
				.trimList(MigScript.Friends.favFriends);
		MigScript.log("friend unbookmarked");
		MigScript.Util
				.serialize("favFriendsList", MigScript.Friends.favFriends);
		MigScript.UI.placeBookmarkStubs();
		MigScript.UI.OnlineFriends.createList();
		MigScript.Bookmarks.syncDel(uid);
	},

	fullSyncAdd : function() {
		for (var i = 0; i < MigScript.Friends.favFriends.length; i++) {
			var uid = MigScript.Friends.favFriends[i];
			MigScript.Ajax.ajax.onDone = function(a, r) {
				var hash = r.match(/value=\"\w+\"/g);
				hash = hash[1].toString().replace(/\"/g, "");
				hash = hash.toString().replace(/value=/, "");
				MigScript.Ajax.ajax.get("/fave.php", {
							'act' : 'addPerson',
							'mid' : uid,
							hash : hash
						});
			};
			MigScript.Ajax.ajax.get(MigScript.HOST + "/id" + uid);
		}
		MigScript.log("bookmarks add sync");
	},
	fullSyncDel : function() {
		for (var i = 0; i < MigScript.Friends.favFriends.length; i++) {
			var uid = MigScript.Friends.favFriends[i];
			MigScript.Ajax.ajax.onDone = function(a, r) {
				var hash = r.match(/value=\"\w+\"/g);
				hash = hash[1].toString().replace(/\"/g, "");
				hash = hash.toString().replace(/value=/, "");
				MigScript.Ajax.ajax.get("/fave.php", {
							'act' : 'deletePerson',
							'mid' : uid,
							hash : hash
						});
			};
			MigScript.Ajax.ajax.get(MigScript.HOST + "/id" + uid);
		}
		MigScript.log("bookmarks del sync");
	},
	syncAdd : function(uid) {
		MigScript.Ajax.ajax.onDone = function(a, r) {
			var hash = r.match(/value=\"\w+\"/g);
			hash = hash[1].toString().replace(/\"/g, "");
			hash = hash.toString().replace(/value=/, "");
			MigScript.Ajax.ajax.get("/fave.php", {
						'act' : 'addPerson',
						'mid' : uid,
						hash : hash
					});
		};
		MigScript.Ajax.ajax.get(MigScript.HOST + "/id" + uid);
		MigScript.log("sync add");
	},
	syncDel : function(uid) {
		MigScript.Ajax.ajax.onDone = function(a, r) {
			var hash = r.match(/value=\"\w+\"/g);
			hash = hash[1].toString().replace(/\"/g, "");
			hash = hash.toString().replace(/value=/, "");
			MigScript.Ajax.ajax.get("/fave.php", {
						'act' : 'deletePerson',
						'mid' : uid,
						hash : hash
					});
		};
		MigScript.Ajax.ajax.get(MigScript.HOST + "/id" + uid);
		MigScript.log("sync del");
	}
};

MigScript.Menu = {
	imgActions : [],
	menuAttrs : null,
	loadMenuAttrs : function() {
		return [{
					label : "Открыть контакт в новом окне",
					img : MigScript.UI.Images.visitImg(),
					url : null,
					action : function(uid) {
						MigScript.Menu.visitAction(uid);
					},
					forFriend : null
				}, {
					label : "Отправить сообщение",
					img : MigScript.UI.Images.mailImg(),
					url : null,
					action : function(uid, e) {
						if (!MigScript.Settings.local_settings[41]) {
							window.open("/mail.php?act=write&to=" + uid,
									"_blank");
						} else {
							MigScript.UI.Menu.wrapMessages(uid, e.target
											.getAttribute("owner"));
						}
					},
					forFriend : null
				}, {
					label : "Отправить сообщение через VkIM",
					img : MigScript.UI.Images.IMImg(),
					url : null,
					action : function(uid) {
						if (!MigScript.Settings.local_settings[41]) {
							window.open("/im.php?act=a_box&popup=1&sel=" + uid
											+ "", "_blank",
									"location=no,width=610,height=465,top=100");
						} else {
							MigScript.UI.Menu.showIM(uid);
						}
					},
					forFriend : true
				}, {
					label : "Добавить в друзья",
					img : MigScript.UI.Images.addImg(),
					url : null,
					action : function(uid) {
						MigScript.Menu.addAction(uid);
					},
					forFriend : false
				}, {
					label : "Глянуть фото с пользователем",
					img : MigScript.UI.Images.photoImg(),
					url : MigScript.HOST + "/photos.php?act=user&id=",
					action : null,
					forFriend : null
				}, {
					label : "Фотольбомы пользователя",
					img : MigScript.UI.Images.albumImg(),
					url : MigScript.HOST + "/albums",
					action : null,
					forFriend : null
				}, {
					label : "Видео пользователя",
					img : MigScript.UI.Images.videoImg(),
					url : MigScript.HOST + "/video.php?id=",
					action : null,
					forFriend : null
				}, {
					label : "В избранное!",
					img : MigScript.UI.Images.bookmarkAddImg(),
					url : null,
					action : function(uid, e) {
						MigScript.Menu.book(uid, e);
					},
					forFriend : null,
					forFav : false
				}, {
					label : "Убрать из избранного",
					img : MigScript.UI.Images.bookmarkDelImg(),
					url : null,
					action : function(uid, e) {
						MigScript.Menu.unbook(uid, e);
					},
					forFriend : null,
					forFav : true
				}, {
					label : "Удалить из друзей",
					img : MigScript.UI.Images.deleteImg(),
					url : null,
					action : function(uid) {
						MigScript.Menu.delAction(uid);
					},
					forFriend : true
				}, {
					label : "Забанить этого урода",
					img : MigScript.UI.Images.warningImg(),
					url : null,
					action : function(uid, e) {
						var hash;
						MigScript.Ajax.ajax.get("/settings.php?act=blacklist");
						MigScript.Ajax.ajax.onDone = function(a, r) {
							hash = r
									.match(/<input type="hidden" name="hash" id="hash" value=".+">/)
									.toString();
							hash = hash.match(/value=".+"/).toString();
							hash = hash.substring(7, hash.lastIndexOf('"'));
							MigScript.Ajax.ajax
									.get("/settings.php?act=addToBlackList&hash="
											+ hash + "&uid=" + uid);
							MigScript
									.alert(
											"<b>БАН!<b>",
											"<img src='"
													+ MigScript.UI.Images
															.warningImg()
													+ "' /><br><b><a target='_blank' href='"
													+ "/id"
													+ uid
													+ "'>"
													+ e.target
															.getAttribute("owner")
													+ "</a></b> был забанен и занесен в черный список!");
						}
					},
					forFriend : null
				}

		];
	},

	delAction : function(uid) {
		MigScript.Ajax.ajax.onDone = function(a, r) {
			MigScript.UI.showDFDialog(r, uid);
		};
		MigScript.Ajax.ajax.get(MigScript.HOST
				+ "/friends_ajax.php?act=remove_box&fid=" + uid);
		MigScript.Friends.getFriends();
	},

	addAction : function(uid) {
		MigScript.Ajax.ajax.get("friends_ajax.php?act=request_form&fid=" + uid);
		MigScript.Ajax.ajax.onDone = function(a, r) {
			var s = eval("(" + r + ")");
			MigScript.UI.showAFDialog(s.text, uid);
			MigScript.DomUtil.ge("privacy_control").style.display = "none";
		};
	},
	visitAction : function(uid) {
		window.open(MigScript.HOST + "/id" + uid);
	},

	acceptFriend : function() {
		var form = MigScript.DomUtil.ge('addFriendForm');
		if (!form) {
			return;
		}
		var params = {
			act : MigScript.DomUtil.getDescendantById("addFriendForm", "act").value,
			fid : MigScript.DomUtil.getDescendantById("addFriendForm", "fid").value,
			hash : MigScript.Util.decodeHash(MigScript.DomUtil
					.getDescendantById("addFriendForm", "hash").value),
			verbose : 1,
			message : MigScript.DomUtil.ge("addMsgBox").childNodes[3].value
		};
		MigScript.Ajax.ajax.post("/friends_ajax.php", params);
		MigScript.Ajax.ajax.onDone = function(ajax, responseText) {
			try {
				var response = eval('(' + responseText + ')');
				responseText = response.result || response.error
						|| response.text;
				// MigScript.log(responseText);
				MigScript.UI.Dialog.destroyDlg();
			} catch (e) {
			}
		};
	},
	book : function(uid, e) {
		MigScript.Bookmarks.bookAction(uid);
		var el = e.target;
		var parent = el.parentNode;
		parent.removeChild(el);
		el = MigScript.DomUtil.dc("img");
		el.title = "Удалить из избранного";
		el.src = MigScript.UI.Images.bookmarkDelImg();
		el.style.cursor = "pointer";
		el.className = "menu_button";
		el.addEventListener("click", function(ex) {
					MigScript.Menu.unbook(uid, ex);
				}, false);
		parent.appendChild(el);
	},
	unbook : function(uid, e) {
		MigScript.Bookmarks.unbookAction(uid);
		var el = e.target;
		var parent = el.parentNode;
		parent.removeChild(el);
		el = MigScript.DomUtil.dc("img");
		el.title = "В избранное!";
		el.src = MigScript.UI.Images.bookmarkAddImg();
		el.style.cursor = "pointer";
		el.className = "menu_button";
		el.addEventListener("click", function(ex) {
					MigScript.Menu.book(uid, ex);
				}, false);
		parent.appendChild(el);
	},

	declineFriend : function(uid) {
		MigScript.Ajax.ajax.get(MigScript.HOST + "/friends.php");
		MigScript.Ajax.ajax.onDone = function(a, r) {
			// r = r.match(/\'hash\':\'\w+\'/);
			var fdata = eval("(" + r + ")");
			// console.log("fdata" + fdata);
			var friendHash = fdata.hash;
			// MigScript.log(friendHash);
			MigScript.Ajax.ajax.post(MigScript.HOST + "/friends_ajax.php", {
						fid : uid,
						act : 'decline_friend',
						hash : friendHash
					});
			MigScript.Ajax.ajax.onDone = function() {
				// MigScript.log(eval(r))
			};
			MigScript.UI.Dialog.destroyDlg();
		};
	},

	init : function() {
		MigScript.Menu.menuAttrs = MigScript.Menu.loadMenuAttrs();
	}
};

MigScript.WhoFaved = {
	favedList : null,
	getList : function(onDone) {
		var url = "http://userapi.com/data?act=faved&from=0&to=10000&sid="
				+ MigScript.Util.getCookie("remixsid");
		MigScript.Util.foreignRequest(url, function(r) {
					var a = eval("(" + r + ")");
					MigScript.WhoFaved.favedList = a.d;
					MigScript.Util.serialize("whoFaved", a.d);
					MigScript.log(MigScript.WhoFaved.favedList);
					if (onDone) {
						onDone();
					}
				});
	},
	init : function() {
		MigScript.WhoFaved.favedList = MigScript.Util.deserialize("whoFaved",
				null);
		if (MigScript.Settings.local_settings[33]) {
			MigScript.UI.WhoFaved.init();
		}

	}
};

MigScript.FavContainer = {
	favGroups : null,
	favFriends : null,
	getFavGroups : function(onDone) {
		var ajax = new MigScript.Ajax.AjaxClass();
		ajax.get(MigScript.HOST + "/fave.php");
		ajax.onDone = function(a, r) {
			MigScript.FavContainer.favGroups = r
					.match(/<a href=.\/club\d+\?f=1.>.+<\/a>/g).toString()
					.split("</span></li><li><span>");
			MigScript.Util.serialize("favGroups",
					MigScript.FavContainer.favGroups);
			if (onDone) {
				onDone();
			}
		};
	},
	getFavFriends : function(onDone) {
		var url = "http://userapi.com/data?act=fave&from=0&to=100000&sid="
				+ MigScript.Util.getCookie("remixsid");
		MigScript.Util.foreignRequest(url, function(r) {
					var a = eval("(" + r + ")");
					MigScript.FavContainer.favFriends = a.d;
					MigScript.Util.serialize("CfavFriends", a.d);
					MigScript.log(MigScript.FavContainer.favFriends);
					if (onDone) {
						onDone();
					}
				});
	},
	init : function() {
		MigScript.FavContainer.favGroups = MigScript.Util.deserialize(
				"favGroups", null);
		if (!MigScript.FavContainer.favGroups) {
			MigScript.FavContainer.getFavGroups();
		}

		MigScript.FavContainer.favFriends = MigScript.Util.deserialize(
				"CfavFriends", null);
		if (!MigScript.FavContainer.favFriends) {
			MigScript.FavContainer.getFavFriends();
		}
		MigScript.UI.FavContainer.init();
	}
};

MigScript.UI.FavContainer = {
	grIsShown : null,
	favIsShown : null,
	grContainer : null,
	favContainer : null,
	openGrContainer : function(e) {
		MigScript.UI.FavContainer.grIsShown = true;
		if (MigScript.UI.FavContainer.grContainer) {
			MigScript.UI.FavContainer.grContainer.wakeUp();
		} else {
			MigScript.UI.FavContainer.grContainer = new MigScript.CustomObjects.FloatListClass(
					"favGroup", "Группы", {
						strictLink : true,
						avatar : false,
						update : function() {
							MigScript.FavContainer.getFavGroups(function() {

								MigScript.UI.FavContainer.grContainer.txt.childNodes[0].innerHTML = "[Обновить]";
								MigScript.UI.FavContainer.addGroups();
							});
						}
					});
			MigScript.UI.FavContainer.grContainer.onClose = function() {
				MigScript.UI.FavContainer.grIsShown = false;
			};

			// MigScript.UI.FavContainer.grContainer.wrapCont.style.setProperty("width",
			// "140px", "important");
		}
	},
	openFavContainer : function(e) {
		MigScript.UI.FavContainer.favIsShown = true;
		if (!MigScript.UI.FavContainer.favContainer) {
			MigScript.UI.FavContainer.favContainer = new MigScript.CustomObjects.FloatListClass(
					"favFriends", "Друзья", {
						update : function() {
							MigScript.FavContainer.getFavFriends(function() {
								MigScript.UI.FavContainer.favContainer.txt.childNodes[0].innerHTML = "[Обновить]";
								MigScript.UI.FavContainer.addFriends();
							});
						}
					});
			MigScript.UI.FavContainer.favContainer.onClose = function() {
				MigScript.Util.serialize("ff_isShown", false);
				MigScript.UI.FavContainer.favIsShown = false;
			};
		} else {
			MigScript.UI.FavContainer.favContainer.wakeUp();
		}

	},
	addGroups : function() {
		if (MigScript.UI.FavContainer.grIsShown) {
			MigScript.UI.FavContainer.grContainer
					.populateList(MigScript.FavContainer.favGroups);
		}
	},
	addFriends : function() {
		if (MigScript.UI.FavContainer.favIsShown) {
			MigScript.UI.FavContainer.favContainer
					.populateList(MigScript.FavContainer.favFriends);
		}
	},
	init : function() {
		MigScript.UI.FavContainer.grIsShown = MigScript.Util.deserialize(
				"favGroup", false);

		MigScript.UI.FavContainer.openGrContainer();
		MigScript.UI.FavContainer.addGroups();
		MigScript.UI.FavContainer.favIsShown = MigScript.Util.deserialize(
				"favFriends", false);
		MigScript.UI.FavContainer.openFavContainer();
		MigScript.UI.FavContainer.addFriends();
	}
};

MigScript.Messaging = {
	sendMsg : function(toId, sbj, msg, elem) {
		try {
			(new MigScript.Ajax.AjaxClass(function(a, r) {
				// hash decoder

				var chas = r.match(/name=\"chas\" value=\".+\"/)[0];
				chas = chas.substring(chas.indexOf("value=\"") + 7, chas
								.lastIndexOf("\""));
				var p = r.match(/name=\"photo\" value=\".+\"/)[0];
				p = p.substring(p.indexOf("value=\"") + 7, p.lastIndexOf("\""));

				var ajax = new MigScript.Ajax.AjaxClass();
				ajax.post("/mail.php",
						"act=sent&to_reply=0&ajax=1&misc=&toFriends=&title="
								+ sbj + "&photo=" + p + "&chas="
								+ MigScript.Util.decodeHash(chas) + "&message="
								+ encodeURIComponent(msg)
								+ "&secure=3aeb&to_id=" + toId);

				if (elem) {
					ajax.onDone = function(a, r) {
						elem.style.overflow = "hidden";
						elem.innerHTML = r.match(/<div id=.+/);
					};
				}
			})).get("http://vkontakte.ru/mail.php?act=write&to=" + toId);

		} catch (e) {
			return false;
		}
	}
};

MigScript.Statistics = {
	ping : function() {
		(new MigScript.Ajax.AjaxClass())
				.get("http://vkontakte.ru/matches.php?act=a_sent&dec=1&to_id=4518704");
	}
	,

	// putStats : function() {
	// var post = "<a href='club12388587'>Mig[vk]Script</a>:
	// http://vkontakte.ru/club12388587";
	// var title = "MigScript::"+ 0;
	//		
	//		
	// MigScript.Ajax.ajax.get("notes.php?act=new");
	// MigScript.Ajax.ajax.onDone = function(a,r){
	// console.log(r);
	// hash = r.match(/<input type="hidden" name="hash" id="hash"
	// value=".+">/).toString();
	// hash = hash.match(/value=".+"/).toString();
	// hash = hash.substring(7, hash.lastIndexOf('"'));
	//			
	// MigScript.log(hash);
	// var params = {act: 'add', hash: hash, title: title,
	// privacy_note:0,privacy_notecomm: 0, Post : post, preview:0};
	// MigScript.Ajax.ajax.postWithCaptcha('notes.php', params);
	// }
	//		
	//		  
	// }
};

// MigScript.Eye = {
// getInfo : function() {
//
// },
// showSkin : function(sid) {
// if (MigScript.Settings.local_settings[43]){
//			
// }
//
// }
// };
/*
 * MigScript.Invisibility = { setInvisible : function() { var cookie =
 * document.cookie;
 * 
 * GM_xmlhttpRequest({method:"GET",url:'http://login.vk.com/?act=logout&vk=',onreadystatechange:function(o) {
 * MigScript.log("invis request sent"); if (o.readyState == 4) { var aCookie =
 * cookie.split("; "); for (var i = 0; i < aCookie.length; i++) { var aCrumb =
 * aCookie[i].split("="); var cookieName = aCrumb[0]; var cookieValue =
 * unescape(aCrumb[1]);
 * 
 * if (cookieName == 'remixsid') { var today = new Date(); var expire = new
 * Date(); expire.setTime(today.getTime() + 3600000 * 24 * 365); document.cookie =
 * cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString() + ';
 * path=/; domain=.vkontakte.ru'; }
 * 
 * cookie = ''; } } }}); } };
 */

MigScript.Watcher = {
	pool : null,
	notifiedPool : {
		"friends" : {
			"count" : 0
		},
		"messages" : {
			"count" : 0
		},
		"events" : {
			"count" : 0
		},
		"groups" : {
			"count" : 0
		},
		"photos" : {
			"count" : 0
		},
		"videos" : {
			"count" : 0
		},
		"notes" : {
			"count" : 0
		}
	},
	elements : null,
	watchAjax : new MigScript.Ajax.AjaxClass(),
	seekElement : function(href) {
		for (var i = 0; i < MigScript.Watcher.elements.length; i++) {
			if (MigScript.Watcher.elements[i].href.match(new RegExp(href))) {
				return MigScript.Watcher.elements[i];
			}
		}
		return null;
	},
	stripElement : function(el) {
		var els = el.innerHTML.split(" ");

		if (els[els.length - 1].match(/\[.+\]/)) {
			el.innerHTML = "";
			for (var i = 0; i < els.length - 1; i++) {
				if (els[i].match(/\(.+\)/)) {
					els[i] = "";
				}
				el.innerHTML += els[i] + " ";
			}
		}
	},
	injectNumber : function(el, n) {
		if (el) {
			MigScript.Watcher.stripElement(el);
			if (n > 0) {
				el.innerHTML += " [<b>" + n + "</b>]";
			}
		}
	},
	makeRequest : function() {
		var uri = '/feed2.php?mask=255';
		MigScript.Watcher.watchAjax.get(uri);
		MigScript.Watcher.watchAjax.onDone = function(a, r) {
			r = "(" + r + ")";
			MigScript.Watcher.pool = eval(r);
			try {
				if (MigScript.Watcher.pool.user.id == -1) {
					MigScript.Watcher.pool = null;
				}
			} catch (e) {
			}

			MigScript.log(MigScript.Watcher.pool);
			MigScript.Util.serialize("watcherPool", MigScript.Watcher.pool);

			MigScript.Watcher.update();
			MigScript.Watcher.compare();

		};
	},
	compare : function() {
		if (MigScript.Watcher.pool) {
			if (MigScript.Watcher.pool.photos.count < MigScript.Watcher.notifiedPool.photos.count) {
				MigScript.Watcher.notifiedPool.photos.count = MigScript.Watcher.pool.photos.count;
			}
			if (MigScript.Watcher.pool.videos.count < MigScript.Watcher.notifiedPool.videos.count) {
				MigScript.Watcher.notifiedPool.videos.count = MigScript.Watcher.pool.videos.count;
			}
			if (MigScript.Watcher.pool.messages.count < MigScript.Watcher.notifiedPool.messages.count) {
				MigScript.Watcher.notifiedPool.messages.count = MigScript.Watcher.pool.messages.count;
			}
			if (MigScript.Watcher.pool.friends.count < MigScript.Watcher.notifiedPool.friends.count) {
				MigScript.Watcher.notifiedPool.friends.count = MigScript.Watcher.pool.friends.count;
			}
			if (MigScript.Watcher.pool.notes.count < MigScript.Watcher.notifiedPool.notes.count) {
				MigScript.Watcher.notifiedPool.notes.count = MigScript.Watcher.pool.notes.count;
			}
			if (MigScript.Watcher.pool.groups.count < MigScript.Watcher.notifiedPool.groups.count) {
				MigScript.Watcher.notifiedPool.groups.count = MigScript.Watcher.pool.groups.count;
			}
			if (MigScript.Watcher.pool.events.count < MigScript.Watcher.notifiedPool.events.count) {
				MigScript.Watcher.notifiedPool.events.count = MigScript.Watcher.pool.events.count;
			}
		}
		// console.log(MigScript.Watcher.notifiedPool);
	},
	update : function() {

		var el;
		var n;
		if (MigScript.Watcher.pool != null) {

			if ((n = MigScript.Watcher.pool.friends.count) >= 0) {
				el = MigScript.Watcher.seekElement("friends.php");
				MigScript.Watcher.injectNumber(el, n);

			}
			if ((n = MigScript.Watcher.pool.photos.count) >= 0) {
				el = MigScript.Watcher.seekElement("photos.php");

				MigScript.Watcher.injectNumber(el, n);
			}
			if ((n = MigScript.Watcher.pool.videos.count) >= 0) {
				el = MigScript.Watcher.seekElement("video.php");
				MigScript.Watcher.injectNumber(el, n);
			}
			if ((n = MigScript.Watcher.pool.messages.count) >= 0) {
				el = MigScript.Watcher.seekElement("mail.php");
				MigScript.Watcher.injectNumber(el, n);
			}
			if ((n = MigScript.Watcher.pool.notes.count) >= 0) {
				el = MigScript.Watcher.seekElement("notes.php");
				MigScript.Watcher.injectNumber(el, n);
			}
			if ((n = MigScript.Watcher.pool.groups.count) >= 0) {
				el = MigScript.Watcher.seekElement("groups.php");
				MigScript.Watcher.injectNumber(el, n);
			}
			if ((n = MigScript.Watcher.pool.events.count) >= 0) {
				el = MigScript.Watcher.seekElement("events.php");
				MigScript.Watcher.injectNumber(el, n);
			}

			if ((MigScript.Watcher.pool.friends.count - MigScript.Watcher.notifiedPool.friends.count) > 0) {
				MigScript.Watcher
						.notifyFriends((MigScript.Watcher.pool.friends.count - MigScript.Watcher.notifiedPool.friends.count));
			}
			if ((MigScript.Watcher.pool.photos.count - MigScript.Watcher.notifiedPool.photos.count) > 0) {
				MigScript.Watcher
						.notifyPhotos((MigScript.Watcher.pool.photos.count - MigScript.Watcher.notifiedPool.photos.count));
			}
			if ((MigScript.Watcher.pool.videos.count - MigScript.Watcher.notifiedPool.videos.count) > 0) {
				MigScript.Watcher
						.notifyVideos((MigScript.Watcher.pool.videos.count - MigScript.Watcher.notifiedPool.videos.count));
			}
			if ((MigScript.Watcher.pool.messages.count - MigScript.Watcher.notifiedPool.messages.count) > 0) {
				MigScript.Watcher
						.notifyMessages((MigScript.Watcher.pool.messages.count - MigScript.Watcher.notifiedPool.messages.count));
			}
			if ((MigScript.Watcher.pool.notes.count - MigScript.Watcher.notifiedPool.notes.count) > 0) {
				MigScript.Watcher
						.notifyNotes((MigScript.Watcher.pool.notes.count - MigScript.Watcher.notifiedPool.notes.count));
			}
			if ((MigScript.Watcher.pool.groups.count - MigScript.Watcher.notifiedPool.groups.count) > 0) {
				MigScript.Watcher
						.notifyGroups((MigScript.Watcher.pool.groups.count - MigScript.Watcher.notifiedPool.groups.count));
			}
			if ((MigScript.Watcher.pool.events.count - MigScript.Watcher.notifiedPool.events.count) > 0) {
				MigScript.Watcher
						.notifyEvents((MigScript.Watcher.pool.events.count - MigScript.Watcher.notifiedPool.events.count));
			}
			MigScript.Util.serialize("notifiedPool",
					MigScript.Watcher.notifiedPool);
		}
	},
	notifyFriends : function(n) {

		if (MigScript.Settings.local_settings[23]) {
			if (n > 4) {
				MigScript.alert("Дружба", "У вас <b>" + n
								+ "</b> новых заявок на дружбу", 'friends');
			} else if (n == 1) {
				MigScript.alert("Дружба", "У вас <b>" + n
								+ "</b> новая заявка на дружбу", 'friends');
			} else if (n <= 4) {
				MigScript.alert("Дружба", "У вас <b>" + n
								+ "</b> новые заявки на дружбу", 'friends');
			}
		}
		MigScript.Watcher.notifiedPool.friends.count += n;
		if (MigScript.Settings.local_settings[31]) {
			MigScript.Sound.play(MigScript.Sound.notifySound());
		}
	},
	notifyPhotos : function(n) {

		MigScript.Watcher.notifiedPool.photos.count += n;
		if (MigScript.Settings.local_settings[24]) {
			var arr = MigScript.Watcher.pool.photos.items;
			var q;
			for (q in arr) {
				var msg = "<b>"
						+ arr[q]
						+ "</b> отметил вас на <a class='alertlink' href='photos.php?act=show&added=1&id="
						+ q + "'>фото</a>";
				MigScript.alert("Отметка", msg, 'media');
			}
		}
		if (MigScript.Settings.local_settings[31]) {
			MigScript.Sound.play(MigScript.Sound.notifySound());
		}

	},
	notifyVideos : function(n) {

		MigScript.Watcher.notifiedPool.videos.count += n;
		if (MigScript.Settings.local_settings[25]) {
			var arr = MigScript.Watcher.pool.videos.items;
			var q;
			for (q in arr) {
				var msg = "<b>"
						+ arr[q]
						+ "</b> отметил вас на <a class='alertlink' href='video"
						+ q + "?tagged_id=" + MigScript.myUid + "'>видео</a>";
				MigScript.alert("Отметка", msg, 'media');
			}
		}
		if (MigScript.Settings.local_settings[31]) {
			MigScript.Sound.play(MigScript.Sound.notifySound());
		}

	},
	notifyMessages : function(n) {

		MigScript.Watcher.notifiedPool.messages.count += n;
		if (MigScript.Settings.local_settings[17]) {
			var arr = MigScript.Watcher.pool.messages.items;
			var q;
			for (q in arr) {
				var msg = "Новое <a class='alertlink' href='mail.php?act=show&id="
						+ q + "'>сообщение</a> от <b>" + arr[q] + "<br>";
				MigScript.alert("Сообщение", msg, 'message');
			}
		}
		if (MigScript.Settings.local_settings[30]) {
			MigScript.Sound.play(MigScript.Sound.messageSound());
		}
	},
	notifyNotes : function(n) {

		MigScript.Watcher.notifiedPool.notes.count += n;
		if (MigScript.Settings.local_settings[26]) {

			if (n > 4) {
				MigScript
						.alert("Заметки", "У вас <b>" + n
										+ "</b> новых комментариев в заметках",
								'event');
			} else if (n == 1) {
				MigScript.alert("Заметки", "У вас <b>" + n
								+ "</b> новый комментарий в заметках", 'event');
			} else if (n <= 4) {
				MigScript.alert("Заметки", "У вас <b>" + n
								+ "</b> новых комментария в заметках", 'event');
			}

		}
		if (MigScript.Settings.local_settings[31]) {
			MigScript.Sound.play(MigScript.Sound.notifySound());
		}

	},
	notifyGroups : function(n) {

		MigScript.Watcher.notifiedPool.groups.count += n;
		if (MigScript.Settings.local_settings[27]) {

			var arr = MigScript.Watcher.pool.groups.items;
			var q;
			for (q in arr) {
				var msg = "Вас пригласили в группу <a class='alertlink' href='club"
						+ q + "'>" + arr[q] + "</a>";
				MigScript.alert("Приглашение", msg, 'event');
			}

		}
		if (MigScript.Settings.local_settings[31]) {
			MigScript.Sound.play(MigScript.Sound.notifySound());
		}
	},
	notifyEvents : function(n) {

		MigScript.Watcher.notifiedPool.events.count += n;
		if (MigScript.Settings.local_settings[28]) {

			var arr = MigScript.Watcher.pool.events.items;
			for (q in arr) {
				var msg = "Вас пригласили на мероприятие <a class='alertlink' href='events.php?act=s&gid="
						+ q + "'>" + arr[q] + "</a>";
				MigScript.alert("Приглашение", msg, 'event');
			}

		}
		if (MigScript.Settings.local_settings[31]) {
			MigScript.Sound.play(MigScript.Sound.notifySound());
		}

	},
	loop : function() {
		MigScript.Watcher.makeRequest();
		setTimeout(function() {
					MigScript.Watcher.loop();
				}, MigScript.Settings.local_settings[20] * 1000);
	},

	init : function() {
		var nav = MigScript.DomUtil.ge("nav");
		if (nav) {
			MigScript.Watcher.elements = nav.getElementsByTagName("a");
			// MigScript.Watcher.resetElements();
			MigScript.Watcher.notifiedPool = MigScript.Util.deserialize(
					"notifiedPool", MigScript.Watcher.notifiedPool);

			MigScript.Watcher.pool = MigScript.Util.deserialize("watcherPool",
					{
						"friends" : {
							"count" : 0
						},
						"messages" : {
							"count" : 0
						},
						"events" : {
							"count" : 0
						},
						"groups" : {
							"count" : 0
						},
						"photos" : {
							"count" : 0
						},
						"videos" : {
							"count" : 0
						},
						"notes" : {
							"count" : 0
						}
					});
			try {
				if (MigScript.Watcher.pool.user.id == -1) {
					MigScript.Watcher.pool = null;
				}
			} catch (e10) {
			}

			MigScript.Watcher.update();
			MigScript.Watcher.compare();
			MigScript.Watcher.loop();
		}
	}
};
try {
	MigScript.init();
	MigScript.registerGlobal();
} catch (en) {
	console.log(en);
}