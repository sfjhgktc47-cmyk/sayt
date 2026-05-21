import Link from "next/link";
import { notFound } from "next/navigation";
import { productCards } from "@/data/product-cards";
import { productPositions } from "@/data/product-positions";
import { categories } from "@/data/categories";
import { ProductTabs } from "@/components/product-tabs";

const productDetails: Record<
  string,
  {
    status: string;
    type: string;
    seoTitle: string;
    seoDescription: string;
    seoText: string;
    selectionParams: {
      label: string;
      keyName: string;
      active: boolean;
    }[];
    characteristics: {
      name: string;
      value: string;
      filter: boolean;
    }[];
  }
> = {
  "iphone-17-pro": {
    status: "Активна",
    type: "Товар с позициями",
    seoTitle: "Купить iPhone 17 Pro — Netizen",
    seoDescription:
      "iPhone 17 Pro с разными вариантами памяти, цвета и SIM. Актуальные цены, наличие и доставка.",
    seoText:
      "iPhone 17 Pro — материнская карточка товара. Клиент выбирает цвет, память и SIM, а сайт подставляет конкретную позицию / SKU.",
    selectionParams: [
      { label: "Цвет", keyName: "color", active: true },
      { label: "Память", keyName: "memory", active: true },
      { label: "SIM", keyName: "sim", active: true },
    ],
    characteristics: [
      { name: "Тип устройства", value: "Смартфон", filter: true },
      { name: "Бренд", value: "Apple", filter: true },
      { name: "Модель", value: "iPhone 17 Pro", filter: false },
      { name: "Гарантия", value: "12 месяцев", filter: false },
      { name: "Комплектация", value: "Устройство, кабель", filter: false },
    ],
  },
  "macbook-pro-14": {
    status: "Активна",
    type: "Товар с позициями",
    seoTitle: "Купить MacBook Pro 14 — Netizen",
    seoDescription:
      "MacBook Pro 14 с разными конфигурациями CPU, GPU, RAM, SSD и цвета.",
    seoText:
      "MacBook Pro 14 — материнская карточка ноутбука. Конкретные конфигурации хранятся в позициях / SKU.",
    selectionParams: [
      { label: "CPU", keyName: "cpu", active: true },
      { label: "GPU", keyName: "gpu", active: true },
      { label: "RAM", keyName: "ram", active: true },
      { label: "SSD", keyName: "ssd", active: true },
      { label: "Цвет", keyName: "color", active: true },
    ],
    characteristics: [
      { name: "Тип устройства", value: "Ноутбук", filter: true },
      { name: "Бренд", value: "Apple", filter: true },
      { name: "Модель", value: "MacBook Pro 14", filter: false },
      { name: "Гарантия", value: "12 месяцев", filter: false },
      { name: "Комплектация", value: "Ноутбук, кабель, адаптер", filter: false },
    ],
  },
  "airpods-pro": {
    status: "Активна",
    type: "Товар с позициями",
    seoTitle: "Купить AirPods Pro — Netizen",
    seoDescription:
      "AirPods Pro с разными вариантами кейса и комплектации.",
    seoText:
      "AirPods Pro — материнская карточка. Клиент выбирает модель или тип кейса, а конкретная позиция хранит цену и наличие.",
    selectionParams: [
      { label: "Модель", keyName: "model", active: true },
      { label: "Кейс", keyName: "case", active: true },
    ],
    characteristics: [
      { name: "Тип устройства", value: "Наушники", filter: true },
      { name: "Бренд", value: "Apple", filter: true },
      { name: "Модель", value: "AirPods Pro", filter: false },
      { name: "Гарантия", value: "12 месяцев", filter: false },
      { name: "Комплектация", value: "Наушники, кейс, кабель", filter: false },
    ],
  },
};

function getCategoryName(categoryId: string) {
  return (
    categories.find((category) => category.id === categoryId)?.name ??
    categoryId
  );
}

function getStatusClass(status: string) {
  if (status === "Активна") {
    return "border-green-500/35 bg-green-500/10 text-green-300";
  }

  if (status === "Черновик") {
    return "border-orange-500/35 bg-orange-500/10 text-orange-300";
  }

  if (status === "Скрыта") {
    return "border-white/10 bg-white/[0.03] text-white/45";
  }

  return "border-blue-500/35 bg-blue-500/10 text-blue-400";
}

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = productCards.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const details =
    productDetails[product.slug] ??
    ({
      status: "Активна",
      type: "Товар с позициями",
      seoTitle: `${product.name} — Netizen`,
      seoDescription: product.shortDescription,
      seoText: product.shortDescription,
      selectionParams: [
        { label: "Цвет", keyName: "color", active: true },
        { label: "Модель", keyName: "model", active: true },
      ],
      characteristics: [
        { name: "Тип устройства", value: getCategoryName(product.category), filter: true },
        { name: "Бренд", value: product.brand, filter: true },
        { name: "Модель", value: product.name, filter: false },
      ],
    } satisfies (typeof productDetails)[string]);

  const positions = productPositions.filter(
    (position) => position.modelSlug === product.slug
  );

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
            <span>Карточка товара</span>
            <span>·</span>
            <span>{product.name}</span>
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

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/[0.045] text-xs text-white/25">
                    Фото
                  </div>

                  <div>
                    <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
                      Материнская карточка
                    </div>

                    <h1 className="mt-3 text-5xl font-bold tracking-[-0.055em]">
                      {product.name}
                    </h1>

                    <p className="mt-4 max-w-[720px] text-sm leading-relaxed text-white/55">
                      Клиент видит эту карточку в каталоге. Конкретные цены,
                      остатки и конфигурации живут отдельно в позициях / SKU.
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex w-fit whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium ${getStatusClass(
                    details.status
                  )}`}
                >
                  {details.status}
                </span>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-4">
                <InfoCard label="Категория" value={getCategoryName(product.category)} />
                <InfoCard label="Бренд" value={product.brand} />
                <InfoCard label="Позиций / SKU" value={String(positions.length)} />
                <InfoCard label="Тип" value={details.type} />
              </div>
            </div>

            <aside className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
                Действия
              </div>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                Управление
              </h2>

              <div className="mt-6 grid gap-3">
                <button className="rounded-xl bg-blue-600 px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                  Сохранить изменения
                </button>

                <Link
                  href="/nz-console/positions/new"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10"
                >
                  Добавить позицию
                </Link>

                <button className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-white/55 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300">
                  Скрыть карточку
                </button>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Карточка"
                title="Основная информация"
                text="Эти данные формируют карточку товара в каталоге и на странице товара."
              />

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field label="Название карточки">
                  <input defaultValue={product.name} className="admin-input" />
                </Field>

                <Field label="Slug карточки">
                  <input defaultValue={product.slug} className="admin-input" />
                </Field>

                <Field label="Категория">
                  <select className="admin-input" defaultValue={product.category}>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Бренд">
                  <input defaultValue={product.brand} className="admin-input" />
                </Field>

                <Field label="Статус">
                  <select className="admin-input" defaultValue={details.status}>
                    <option>Активна</option>
                    <option>Черновик</option>
                    <option>Скрыта</option>
                  </select>
                </Field>

                <Field label="Тип карточки">
                  <select className="admin-input" defaultValue={details.type}>
                    <option>Товар с позициями</option>
                    <option>Обычный товар</option>
                    <option>Аксессуар</option>
                    <option>Комплект</option>
                  </select>
                </Field>
              </div>
            </section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Описание"
                title="Тексты карточки"
                text="Описание относится к общей модели товара, а не к отдельной SKU-позиции."
              />

              <div className="mt-8 grid gap-5">
                <Field label="Короткое описание">
                  <textarea
                    defaultValue={product.shortDescription}
                    className="admin-textarea min-h-[110px]"
                  />
                </Field>

                <Field label="Полное описание">
                  <textarea
                    defaultValue={product.description ?? product.shortDescription}
                    className="admin-textarea min-h-[180px]"
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Параметры выбора"
                title="Что выбирает клиент"
                text="Карточка задаёт параметры выбора, а позиции заполняют конкретные значения."
              />

              <div className="mt-8 rounded-2xl border border-blue-500/25 bg-blue-500/10 p-5">
                <div className="font-semibold text-blue-400">
                  Это относится к материнской карточке
                </div>

                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Например, карточка iPhone 17 Pro задаёт “Цвет / Память / SIM”,
                  а позиция заполняет “Silver / 256 GB / eSIM”.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="hidden grid-cols-[1fr_1fr_140px] gap-3 px-4 text-sm text-white/40 md:grid">
                  <div>Название для клиента</div>
                  <div>Ключ в системе</div>
                  <div>Статус</div>
                </div>

                {details.selectionParams.map((param) => (
                  <ParamRow
                    key={param.keyName}
                    label={param.label}
                    keyName={param.keyName}
                    active={param.active}
                  />
                ))}
              </div>

              <button className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
                Добавить параметр →
              </button>
            </section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Характеристики"
                title="Характеристики модели"
                text="Характеристики относятся ко всей модели. Значения конкретной конфигурации живут в позициях / SKU."
              />

              <div className="mt-8 grid gap-4">
                <div className="hidden grid-cols-[1fr_1fr_170px] gap-3 px-4 text-sm text-white/40 md:grid">
                  <div>Название</div>
                  <div>Значение</div>
                  <div>Фильтр</div>
                </div>

                {details.characteristics.map((item) => (
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
                title="SKU внутри карточки"
                text="Здесь лежат конкретные конфигурации товара: цена, наличие, параметры и SKU."
              />

              <div className="mt-8 grid gap-4">
                {positions.length > 0 ? (
                  positions.map((position) => (
                    <Link
                      key={position.sku}
                      href={`/nz-console/positions/${position.sku}`}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-blue-500/35 hover:bg-blue-500/[0.04]"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="text-sm text-white/35">
                            SKU {position.sku}
                          </div>

<h3 className="mt-1 text-lg font-bold">
  {product.name} {position.memory} {position.color} {position.sim}
</h3>
                          <p className="mt-2 text-sm text-white/45">
                            {position.color} · {position.memory} · {position.sim}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-bold">{position.price}</span>

                          {position.stock > 0 ? (
                            <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-300">
                              {position.stock} шт.
                            </span>
                          ) : (
                            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm text-orange-300">
                              Нет
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/45">
                    У этой карточки пока нет позиций / SKU.
                  </div>
                )}
              </div>

              <Link
                href="/nz-console/positions/new"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                Добавить позицию →
              </Link>
            </section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="SEO"
                title="SEO карточки"
                text="SEO карточки относится к общей модели. У конкретной позиции может быть свой SEO-текст."
              />

              <div className="mt-8 grid gap-5">
                <Field label="SEO title">
                  <input defaultValue={details.seoTitle} className="admin-input" />
                </Field>

                <Field label="SEO description">
                  <textarea
                    defaultValue={details.seoDescription}
                    className="admin-textarea min-h-[120px]"
                  />
                </Field>

                <Field label="Видимый SEO-текст">
                  <textarea
                    defaultValue={details.seoText}
                    className="admin-textarea min-h-[160px]"
                  />
                </Field>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Сводка"
                title="Карточка"
                text="Краткая информация по материнской карточке."
              />

              <div className="mt-6 grid gap-3">
                <InfoLine label="URL" value={`/product/${product.slug}`} />
                <InfoLine label="Название" value={product.name} />
                <InfoLine label="Категория" value={getCategoryName(product.category)} />
                <InfoLine label="Бренд" value={product.brand} />
                <InfoLine label="Позиции" value={String(positions.length)} />
              </div>
            </section>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
              <SectionTitle
                label="Размещение"
                title="Где показывать"
                text="Настройки видимости карточки на витрине сайта."
              />

              <div className="mt-6 grid gap-3">
                <ToggleLine title="Показывать в каталоге" active />
                <ToggleLine title="Показывать на главной" />
                <ToggleLine title="Добавить в новинки" active />
                <ToggleLine title="Добавить в популярные" />
                <ToggleLine title="Показывать в рекомендациях" />
              </div>
            </section>

            <section className="rounded-[34px] border border-blue-500/25 bg-blue-500/10 p-8">
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
                Логика
              </div>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                Карточка без цены
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/55">
                Материнская карточка хранит модель, описание, характеристики и
                параметры выбора. Цена, наличие и SKU хранятся в позициях.
              </p>
            </section>

            <div className="grid gap-3">
              <button className="rounded-xl bg-blue-600 px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                Сохранить изменения
              </button>

              <Link
                href={`/product/${product.slug}`}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10"
              >
                Открыть на сайте
              </Link>
            </div>
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

      <p className="mt-3 max-w-[720px] text-sm leading-relaxed text-white/50">
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

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm text-white/40">{label}</div>
      <div className="mt-2 font-bold">{value}</div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
      <span className="text-white/45">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}

function ParamRow({
  label,
  keyName,
  active = false,
}: {
  label: string;
  keyName: string;
  active?: boolean;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_1fr_140px] md:items-center">
      <input defaultValue={label} className="admin-input" />
      <input defaultValue={keyName} className="admin-input" />

      <button
        className={`rounded-xl border px-4 py-3 text-sm font-medium ${
          active
            ? "border-blue-500/35 bg-blue-500/10 text-blue-400"
            : "border-white/10 bg-white/[0.03] text-white/45"
        }`}
      >
        {active ? "Активен" : "Скрыт"}
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
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_1fr_170px] md:items-center">
      <input defaultValue={name} className="admin-input" />
      <input defaultValue={value} className="admin-input" />

      <button
        className={`rounded-xl border px-4 py-3 text-sm font-medium ${
          filter
            ? "border-blue-500/35 bg-blue-500/10 text-blue-400"
            : "border-white/10 bg-white/[0.03] text-white/45"
        }`}
      >
        {filter ? "В фильтрах" : "Не в фильтрах"}
      </button>
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