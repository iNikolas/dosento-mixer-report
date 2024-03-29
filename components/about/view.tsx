import React from "react";

import { ReadDatabaseButton } from "../read-database-button";

export function About() {
  return (
    <div className="prose flex-1 flex flex-col justify-center p-10 md:p-20">
      <h1>
        Легко керуйте звітами змішувальної установки: трансформуйте, сортуйте та
        аналізуйте з легкістю
      </h1>
      <p>
        Оптимізуйте свій робочий процес за допомогою інтуїтивно зрозумілого
        інструменту, розробленого для легкого читання та організації звітів у
        форматі CSV. Платформа забезпечує безперебійне представлення даних за
        допомогою таблиць, надаючи можливості сортування, пошуку та додаткове
        фільтрування дат. Отримайте глибше уявлення про свої дані за допомогою
        вичерпних підсумків у кожному стовпці та зручної функції загального
        підсумку. Спростіть процес звітування та розкрийте весь потенціал своїх
        даних!
      </p>

      <h3>Немає потрібного файлу CSV?</h3>

      <ReadDatabaseButton />
    </div>
  );
}
