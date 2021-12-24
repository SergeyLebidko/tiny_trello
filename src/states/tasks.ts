export const tasks = {
    tasks: [
        {
            id: 1,
            cardId: 1,
            text: 'some text',
            done: false,
            importance: 'none', // может быть low,medium и high, если выбран, то отображается цвет рядом с текстом
            deadline: new Date(), // для дальнейшей интеграции с календарем
            order: 1,
        },
        {
            id: 2,
            cardId: 3,
            text: 'some 2 text',
            done: true,
            importance: 'high', // может быть low,medium и high, если выбран, то отображается цвет рядом с текстом
            deadline: new Date(), // для дальнейшей интеграции с календарем
            order: 2,
        },
    ]
}