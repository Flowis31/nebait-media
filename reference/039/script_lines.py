# 039 «Рис против 6 сушилок. Кто спасёт мокрый телефон?» — Как это работает, «Рис 2» (часть 2 к 022), пятница 27.11.2026.
# Стиль: проверка мифа на глазах — опыт с мокрыми губками в семи сушилках и на столе; маскот ставит опыт, взвешивает, ставит штамп.
# Источники (сверено 27.11.2026):
#   iFixit «Rice Is for Dinner, Not Repair» (K. Purdy, 06.2019, обновл. 08.2024): тест Gazelle 2014 — мокрая губка в семи материалах и на воздухе;
#     «Dry, uncooked conventional rice was the worst of the seven options we tested»; «absorbed the least water in 24 hours, losing out to silica gel,
#     cat litter, couscous, instant oatmeal, classic oatmeal and instant rice»; «the sponge left in open air actually dried the most»;
#     «Power the device off immediately»; «Corrosion is instant when a phone hits water».
#   Apple Support 108039 «About splash, water, and dust resistance of iPhone 7 and later» (28.10.2026): «do not charge your device until it's completely dry»,
#     «Allow at least 5 hours before charging»; «tap it gently against your hand with the … connector facing down»; «a fan blowing cool air directly into
#     the … connector might help»; «Don't dry your iPhone using an external heat source».
# Вердикт: БАЙТ (рис — последний из семи, лучше всех сохнет на воздухе).
LINES = [
 ("hook", "Рис и ещё 6|шесть сушилок. Какая спасёт мокрый телефон?", 0.1),
 ("f1",   "Их проверили на мокрых губках.", 0.1),
 ("f2",   "Губки закопали в рис, кускус, овсянку и даже кошачий наполнитель.", 0.1),
 ("f3",   "А одну просто оставили на столе.", 0.15),
 ("q1",   "А что пока с телефоном?", 0.1),
 ("w1",   "Сразу выключи. Вода под током разъедает контакты почти мгновенно.", 0.12),
 ("w2",   "И не заряжай: Apple|Эпл просит ждать минимум 5|пять часов.", 0.12),
 ("w3",   "Постучи телефоном о ладонь, разъёмом вниз.", 0.1),
 ("w4",   "Потом~—|Потом; под вентилятор. Только холодный, не фен.", 0.12),
 ("j1",   "И не в кошачий лоток: кот не поймёт.", 0.4),
 ("r1",   "Через сутки губки взвесили.", 0.1),
 ("r2",   "Рис~—|Рис; последний из семи. Хуже кошачьего наполнителя.", 0.12),
 ("r3",   "А лучше всех высохла губка на столе.", 0.3),
 ("v1",   "Рис спасает телефон? Байт. Спасает воздух.", 0.3),
 ("ask",  "А ты свой телефон в рис клал?", 0.0),
]
