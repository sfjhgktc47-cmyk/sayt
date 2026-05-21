import Link from "next/link";
import { categories } from "@/data/categories";

const brands = ["Apple", "Samsung", "Dyson", "Sony", "JBL", "PlayStation"];

const cardStatuses = ["Активна", "Черновик", "Скрыта"];

const productTypes = [
  "Товар с позициями",
  "Обычный товар",
  "Аксессуар",
  "Комплект",
];

const modelCharacteristics = [
  {
    name: "Тип устройства",
    value: "Смартфон",
    filter: true,
  },
  {
    name: "Модель",
    value: "iPhone 17 Pro",
    filter: false,
  },
  {
    name: "Бренд",
    value: "Apple",
    filter: true,
  },
  {
    name: "Гарантия",
    value: "12 месяцев",
    filter: false,
  },
  {
    name: "Комплектация",
    value: "Устройство, кабель",
    filter: false,
  },
];

export default function AdminNewProductPage() {
  return (
    <main className="min-h-screen bg-[#020814] px-6 py-6 text-white">
      <div className="mx-auto max-w-[1440px]">
        <header className="flex min-h-[76px] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-6">
          <Link
            href="/nz-console"
            className="text-xl font-bold tracking-[-0.04em]"
          >
            Netizen Console
          </Link>

          <div className="hidden items-center gap-3 text-sm text-white/55 md:flex">
            <span>Новая карточка</span>
            <span>·</span>
            <span>материнский товар</span>
          </div>

          <Link
            href="/nz-console/products"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10"
          >
            К карточкам →
          </Link>
        </header>

        <section className="mt-10">
          <Link
            href="/nz-console/products"
            className="text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            ← Назад к карточкам
          </Link>

          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-blue-500/35 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Создание карточки
              </div>

              <h1 className="mt-5 text-5xl font-bold tracking-[-0.055em]">
                Товарная карточка
              </h1>

              <p className="mt-4 max-w-[780px] text-sm leading-relaxed text-white/55">
                Это материнская карточка, которую клиент видит в каталоге:
                например, iPhone 17 Pro. Конкретные позиции с памятью, цветом,
                SIM, ценой и наличием добавляются отдельно в разделе
                “Позиции / SKU”.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
                Сохранить черновик
              </button>

              <button className="rounded-xl bg-blue-600 px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                Создать карточку →
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Карточка"
                title="Основная информация"
                text="Эти данные формируют карточку, которую клиент увидит в каталоге, поиске, избранном и рекомендациях."
              />

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field label="Название карточки">
                  <input
                    placeholder="Например: iPhone 17 Pro"
                    className="admin-input"
                  />
                </Field>

                <Field label="Slug карточки">
                  <input placeholder="iphone-17-pro" className="admin-input" />
                </Field>

                <Field label="Категория">
                  <select className="admin-input">
                    <option>Выберите категорию</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Бренд">
                  <select className="admin-input">
                    <option>Выберите бренд</option>
                    {brands.map((brand) => (
                      <option key={brand}>{brand}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Статус карточки">
                  <select className="admin-input">
                    {cardStatuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Тип карточки">
                  <select className="admin-input">
                    {productTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Параметры выбора"
                title="Что выбирает клиент"
                text="Здесь задаются параметры, которые клиент будет выбирать на странице товара. Для iPhone — цвет, память и SIM. Для MacBook — CPU, GPU, RAM, SSD и цвет. Для AirPods — модель или тип кейса."
              />

              <div className="mt-8 rounded-2xl border border-blue-500/25 bg-blue-500/10 p-5">
                <div className="font-semibold text-blue-400">
                  Это относится к материнской карточке
                </div>

                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Карточка задаёт, какие параметры есть у модели. Позиции потом
                  только заполняют значения этих параметров. Например, карточка
                  задаёт “Цвет / Память / SIM”, а позиция заполняет:
                  Silver / 256 GB / eSIM.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="hidden grid-cols-[1fr_1fr_140px] gap-3 px-4 text-sm text-white/40 md:grid">
                  <div>Название для клиента</div>
                  <div>Ключ в системе</div>
                  <div>Статус</div>
                </div>

                <SelectionParamRow label="Цвет" systemKey="color" active />
                <SelectionParamRow label="Память" systemKey="memory" active />
                <SelectionParamRow label="SIM" systemKey="sim" active />
              </div>

              <button className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
                Добавить параметр →
              </button>
            </section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Фото"
                title="Изображения карточки"
                text="Главное фото будет использоваться в каталоге, избранном, корзине и на странице товара."
              />

              <div className="mt-8 grid gap-5 md:grid-cols-[1fr_1fr]">
                <div className="rounded-[28px] border border-dashed border-white/15 bg-black/20 p-8 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/[0.045] text-white/25">
                    Фото
                  </div>

                  <h3 className="mt-5 text-xl font-bold">Главное фото</h3>

                  <p className="mx-auto mt-2 max-w-[320px] text-sm leading-relaxed text-white/45">
                    Основное изображение карточки товара.
                  </p>

                  <button className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
                    Выбрать файл
                  </button>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <h3 className="text-xl font-bold">Галерея</h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/45">
                    Дополнительные изображения для страницы товара.
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.035] text-xs text-white/25"
                      >
                        +
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Описание"
                title="Тексты карточки"
                text="Описание относится к общей модели товара, а не к отдельной позиции."
              />

              <div className="mt-8 grid gap-5">
                <Field label="Короткое описание">
                  <textarea
                    placeholder="Премиальный смартфон Apple с мощной камерой и высокой производительностью."
                    className="admin-textarea min-h-[110px]"
                  />
                </Field>

                <Field label="Полное описание">
                  <textarea
                    placeholder="Подробное описание товара, преимущества, комплектация и особенности."
                    className="admin-textarea min-h-[180px]"
                  />
                </Field>
              </div>
            </section>
            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
  <SectionTitle
    label="Характеристики"
    title="Характеристики модели"
    text="Здесь хранятся общие характеристики материнской карточки. Они относятся ко всей модели, а не к конкретной позиции. Например: тип устройства, бренд, модель, гарантия, комплектация."
  />

  <div className="mt-8 rounded-2xl border border-blue-500/25 bg-blue-500/10 p-5">
    <div className="font-semibold text-blue-400">
      Чем отличается от параметров выбора
    </div>

    <p className="mt-2 text-sm leading-relaxed text-white/55">
      Характеристики — это информация о модели. Параметры выбора — это то, что
      клиент выбирает перед покупкой. Например, “Гарантия” — характеристика, а
      “Цвет / Память / SIM” — параметры выбора.
    </p>
  </div>

  <div className="mt-8 grid gap-4">
    <div className="hidden grid-cols-[1fr_1fr_180px] gap-3 px-4 text-sm text-white/40 md:grid">
      <div>Название характеристики</div>
      <div>Значение</div>
      <div>Фильтр каталога</div>
    </div>

    <CharacteristicRow name="Тип устройства" value="Смартфон" filter />
    <CharacteristicRow name="Модель" value="iPhone 17 Pro" />
    <CharacteristicRow name="Бренд" value="Apple" filter />
    <CharacteristicRow name="Гарантия" value="12 месяцев" />
    <CharacteristicRow name="Комплектация" value="Устройство, кабель" />
  </div>

  <button className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
    Добавить характеристику →
  </button>
</section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Характеристики"
                title="Общие характеристики модели"
                text="Здесь находятся характеристики, которые относятся ко всей карточке. Цена, наличие, цвет, память и SIM будут жить в позициях."
              />

              <div className="mt-8 rounded-2xl border border-blue-500/25 bg-blue-500/10 p-5">
                <div className="font-semibold text-blue-400">
                  Что хранится здесь
                </div>

                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  В этом блоке храним общие данные модели: тип устройства,
                  бренд, модель, гарантию и комплектацию. Конкретные
                  конфигурации создаются отдельно в разделе “Позиции / SKU”.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="hidden grid-cols-[1fr_1fr_180px] gap-3 px-4 text-sm text-white/40 md:grid">
                  <div>Название характеристики</div>
                  <div>Значение</div>
                  <div>Фильтры каталога</div>
                </div>

                {modelCharacteristics.map((item) => (
                  <CharacteristicRow
                    key={item.name}
                    name={item.name}
                    value={item.value}
                    filter={item.filter}
                  />
                ))}
              </div>

              <button className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
                Добавить характеристику →
              </button>
            </section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Позиции"
                title="Конкретные товары добавляются отдельно"
                text="Позиции — это реальные SKU с ценой, наличием, памятью, цветом и SIM. Они будут привязываться к этой карточке через поле “модель”."
              />

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <InfoBox
                    title="Карточка"
                    text="iPhone 17 Pro — видит клиент в каталоге."
                  />

                  <InfoBox
                    title="Позиции"
                    text="256 GB Silver, 512 GB Silver, 1 TB Blue."
                  />

                  <InfoBox
                    title="Связь"
                    text="Позиция выбирает модель: iPhone 17 Pro."
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/nz-console/positions"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500"
                  >
                    Открыть позиции →
                  </Link>

                  <Link
                    href="/nz-console/positions/new"
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10"
                  >
                    Добавить позицию
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="sticky top-6 space-y-6">
              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
                <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
                  Размещение
                </div>

                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                  Где показывать карточку
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Эти настройки относятся к материнской карточке товара.
                </p>

                <div className="mt-7 grid gap-3">
                  <ToggleLine title="Показывать в каталоге" active />
                  <ToggleLine title="Показывать на главной" />
                  <ToggleLine title="Добавить в новинки" active />
                  <ToggleLine title="Добавить в популярные" />
                  <ToggleLine title="Показывать в рекомендациях" />
                </div>
              </div>

              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
                <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
                  Связанные товары
                </div>

                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                  Рекомендации
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Эти блоки будут показываться на странице товара и в корзине.
                </p>

                <div className="mt-7 grid gap-4">
                  <AdminSelectBlock
                    title="С этим товаром покупают"
                    text="Например: чехол, зарядка, наушники, аксессуары."
                  />

                  <AdminSelectBlock
                    title="Похожие товары"
                    text="Товары той же категории или близкие по цене."
                  />

                  <AdminSelectBlock
                    title="Аксессуары"
                    text="Дополнительные товары, которые подходят к этой модели."
                  />
                </div>
              </div>

              <div className="rounded-[34px] border border-blue-500/25 bg-blue-500/10 p-6">
                <div className="font-semibold text-blue-400">
                  Структура товара
                </div>

                <div className="mt-4 space-y-3 text-sm text-white/55">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    Карточка: iPhone 17 Pro
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    Параметры: цвет / память / SIM
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    Позиции: добавляются в разделе “Позиции / SKU”
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <button className="rounded-xl bg-blue-600 px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                  Создать карточку
                </button>

                <button className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
                  Сохранить черновик
                </button>
              </div>
            </section>
          </aside>
        </section>

        <style>{`
          .admin-input {
            height: 52px;
            width: 100%;
            border-radius: 14px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(0,0,0,0.2);
            padding: 0 18px;
            color: white;
            outline: none;
            font-size: 14px;
          }

          .admin-input::placeholder {
            color: rgba(255,255,255,0.35);
          }

          .admin-input:focus {
            border-color: rgba(59,130,246,0.55);
          }

          .admin-textarea {
            width: 100%;
            resize: vertical;
            border-radius: 18px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(0,0,0,0.2);
            padding: 18px;
            color: white;
            outline: none;
            font-size: 14px;
            line-height: 1.6;
          }

          .admin-textarea::placeholder {
            color: rgba(255,255,255,0.35);
          }

          .admin-textarea:focus {
            border-color: rgba(59,130,246,0.55);
          }
        `}</style>
      </div>
    </main>
  );
}

function SectionTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
        {label}
      </div>

      <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">{title}</h2>

      <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-white/50">
        {text}
      </p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-white/70">{label}</div>
      {children}
    </label>
  );
}

function SelectionParamRow({
  label,
  systemKey,
  active = false,
}: {
  label: string;
  systemKey: string;
  active?: boolean;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_1fr_140px] md:items-center">
      <div>
        <div className="mb-2 text-xs text-white/35 md:hidden">
          Название для клиента
        </div>

        <input defaultValue={label} className="admin-input" />
      </div>

      <div>
        <div className="mb-2 text-xs text-white/35 md:hidden">
          Ключ в системе
        </div>

        <input defaultValue={systemKey} className="admin-input" />
      </div>

      <button
        className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
          active
            ? "border-blue-500/35 bg-blue-500/10 text-blue-400"
            : "border-white/10 bg-white/[0.03] text-white/45 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
        }`}
      >
        {active ? "Активен ✓" : "Скрыт"}
      </button>
    </div>
  );
}

function CharacteristicRow({
  name,
  value,
  filter = false,
}: {
  name: string;
  value: string;
  filter?: boolean;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_1fr_180px] md:items-center">
      <div>
        <div className="mb-2 text-xs text-white/35 md:hidden">
          Название характеристики
        </div>

        <input defaultValue={name} className="admin-input" />
      </div>

      <div>
        <div className="mb-2 text-xs text-white/35 md:hidden">Значение</div>

        <input defaultValue={value} className="admin-input" />
      </div>

      <button
        className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
          filter
            ? "border-blue-500/35 bg-blue-500/10 text-blue-400"
            : "border-white/10 bg-white/[0.03] text-white/45 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
        }`}
      >
        {filter ? "В фильтрах ✓" : "Не в фильтрах"}
      </button>
    </div>
  );
}

function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-white/45">{text}</p>
    </div>
  );
}

function ToggleLine({
  title,
  active = false,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <button className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left transition-colors hover:border-blue-500/35 hover:bg-blue-500/10">
      <span className="text-sm font-medium">{title}</span>

      <span
        className={`flex h-7 w-12 items-center rounded-full p-1 transition-colors ${
          active ? "bg-blue-600" : "bg-white/10"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white transition-transform ${
            active ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

function AdminSelectBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="font-semibold">{title}</div>

      <p className="mt-2 text-sm leading-relaxed text-white/45">{text}</p>

      <button className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
        Выбрать товары →
      </button>
    </div>
  );
}