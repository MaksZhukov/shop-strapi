export default {
  config: {
    locales: ["ru", "en"],
    translations: {
      ru: {
        // "Settings.apiTokens.copy.editMessage":
        //   "Из соображений безопасности вы можете увидеть свой токен только один раз.",
        // "Settings.apiTokens.copy.editTitle": "Этот токен больше не доступен",
        // "Settings.apiTokens.types.full-access": "Полный доступ",
        // "Settings.apiTokens.types.read-only": "Только для чтения",
        // "Settings.apiTokens.title": "API Токены",
        // "Settings.apiTokens.description":
        //   "Список сгенерированных токенов для использования API",
        // "global.save": "Сохранить",
        // "global.details": "Подробности",
        // "global.documentation": "Документация",
        // "global.back": "Назад",
        // "global.settings": "Настройки",
        // "global.roles": "Роли",
        // "global.users": "Пользователи",
        // "global.disabled": "Отключено",
        // "global.enabled": "Включено",
        // "global.reset-password": "Сброс пароля",
        // "global.plugins": "Плагины",
        // "global.profile": "Профиль",
        // "global.marketplace": "Площадка плагинов",
        // "global.content-manager": "Редактор контента",
        // "Settings.application.strapiVersion": "версия strapi",
        // "admin.pages.MarketPlacePage.subtitle": "Получите больше от Strapi",
        // "admin.pages.MarketPlacePage.search.placeholder": "Найти плагин",
        // "app.components.LeftMenu.logout": "Выйти",
        // "app.components.LeftMenu.navbrand.title": "Strapi Панель",
        // "app.components.LeftMenu.navbrand.workplace": "Рабочая область",
        // "content-manager.components.LeftMenu.single-types": "Одиночные типы",
        // "content-manager.components.LeftMenu.collection-types":
        //   "Типы коллекций",
        // "content-manager.HeaderLayout.button.label-add-entry":
        //   "Создать новую запись",
      },
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
