export const MATCHES_COUNT = 25;
export const MATCHES_PER_TURN = 3;

const bot = (matchesLeft, hand) => {
    // Если у бота первый ход, берем 2 спички
    if (matchesLeft === MATCHES_COUNT) return Promise.resolve(2);
    // Если конец игры, берем спичек до четного количества
    if (matchesLeft < MATCHES_PER_TURN) {
        if (hand % 2) return Promise.resolve(1); //Если в руках нечетное
        else if (matchesLeft >= 2) return Promise.resolve(2); // Если в руках четное и есть 2 спички}
        else return Promise.resolve(1); // Бот проиграл
    }
    else { // Если не конец игры, берем нечетное количество спичек и оставляем
        // на столе число, у котороко остаток от деления на 4 равен 0 или 1
        for (let i = matchesLeft - 1; i >= 0; i--) {
            if (!(i % 4) || i % 4 === 1) {
                if ((matchesLeft - i) % 2) return Promise.resolve(matchesLeft - i);
            }
        }
    }
    return Promise.reject("Компьютер не может сделать ход. Игра окончена, игрок победил"); // На всякий случай
};

export default bot;