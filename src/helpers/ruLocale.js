import ruLocale                                                  from "date-fns/locale/ru";
import buildLocalizeFn                                           from 'date-fns/locale/_lib/buildLocalizeFn';

export const monthValues = {
   narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
   abbreviated: [
      "Янв.",
      "Фев.",
      "Март",
      "Апр.",
      "Май",
      "Июнь",
      "Июль",
      "Авг.",
      "Сент.",
      "Окт.",
      "Нояб.",
      "Дек."
   ],
   wide: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
   ]
};


ruLocale.localize.month = buildLocalizeFn({
   values: monthValues,
   defaultWidth: 'wide',
   defaultFormattingWidth: 'wide'
})
