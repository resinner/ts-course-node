"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tcp = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const domain_1 = require("app/domain");
const middlewares_1 = require("app/middlewares");
// Оголошуємо клас Tcp, який реалізує інтерфейс IService
class Tcp {
    // Конструктор, що реалізує шаблон Singleton для класу Tcp
    constructor() {
        this.routePrefix = "/api"; // Префикс для маршрутов API
        this.server = (0, express_1.default)(); // Экземпляр Express.js
        // Якщо екземпляр ще не створено, зберігаємо посилання на поточний екземпляр
        if (!Tcp.instance) {
            Tcp.instance = this;
        }
        // Повертаємо посилання на єдиний екземпляр класу
        return Tcp.instance;
    }
    // Метод для ініціалізації сервісу
    async init() {
        const { server, routePrefix } = this;
        // Парсимо тіло запиту, потрібно для middlewares
        server.use(express_1.default.json());
        // Використовуємо бібліотеку routing-controllers для налаштування маршрутів
        (0, routing_controllers_1.useExpressServer)(server, {
            routePrefix,
            controllers: domain_1.controllers,
            middlewares: middlewares_1.middlewares,
            cors: true,
            defaultErrorHandler: true,
            validation: false, // Відключаємо вбудовану валідацію, щоб ми могли перевірити DTO самі всередині контролера
        });
        // Повертаємо Promise, який успішно виконується, коли сервер починає слухати порт
        return new Promise((resolve) => {
            server.listen(4000, () => {
                console.log("Tcp service started on port 4000");
                return resolve(true);
            });
        });
    }
}
exports.Tcp = Tcp;
//# sourceMappingURL=Tcp.js.map