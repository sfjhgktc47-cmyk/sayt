import Link from "next/link";
import { productCards } from "@/data/product-cards";
import { productPositions } from "@/data/product-positions";
import { categories } from "@/data/categories";

const tabs = [
  {
    label: "Все",
    count: productCards.length,
    active: true,
  },
  {
    label: "Активные",
    count: productCards.filter((product) => product.status === "active").length,
    active: false,
  },
  {
    label: "Черновики",
    count: 0,
    active: false,
  },
  {
    label: "Скрытые",
    count: 0,
    active: false,
  },
];

function getCategoryName(categoryId: string) {
  return (
    categories.find((category) => category.id === categoryId)?.name ??
    categoryId
  );
}

function getStatusName(status: string) {
  const statuses: Record<string, string> = {
    active: "Активна",
    draft: "Черновик",
    hidden: "Скрыта",
  };

  return statuses[status] ?? status;
}

export default function AdminProductsPage() {
  return (
    <main className="min-h-screen bg-[#020814] px-6 py-6 text-white">
      <div className="mx-auto max-w-[1600px]">
        <header className="flex min-h-[76px] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-6">
          <Link
            href="/nz-console"
            className="text-xl font-bold tracking-[-0.04em]"
          >
            Netizen Console
          </Link>

          <div className="hidden items-center gap-3 text-sm text-white/55 md:flex">
            <span>Карточки товаров</span>
            <span>·</span>
            <span>материнские позиции</span>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10"
          >
            На сайт →
          </Link>
        </header>

        <section className="mt-10">
          <Link
            href="/nz-console"
            className="text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            ← В админку
          </Link>

          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-5xl font-bold tracking-[-0.055em]">
                Карточки товаров
              </h1>

              <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-white/55">
                Здесь находятся материнские карточки, которые видит клиент в
                каталоге: iPhone 17 Pro, MacBook Pro 14, AirPods Pro. Конкретные
                цены, остатки, цвета и конфигурации лежат отдельно в разделе
                “Позиции / SKU”.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/nz-console/positions"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10"
              >
                Открыть позиции
              </Link>

              <Link
                href="/nz-console/products/new"
                className="rounded-xl bg-blue-600 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                Создать карточку →
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <MetricCard label="Всего карточек" value={String(productCards.length)} />
          <MetricCard
            label="Активные"
            value={String(
              productCards.filter((product) => product.status === "active")
                .length
            )}
          />
          <MetricCard
            label="Позиции / SKU"
            value={String(productPositions.length)}
          />
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap gap-2 border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                className={`relative px-4 py-4 text-sm font-medium transition-colors ${
                  tab.active
                    ? "text-white"
                    : "text-white/45 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>

                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    tab.active
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-white/45"
                  }`}
                >
                  {tab.count}
                </span>

                {tab.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.035] p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-1 flex-col gap-3 md:flex-row">
              <input
                placeholder="Поиск по названию карточки / бренду / категории"
                className="h-12 flex-1 rounded-xl border border-white/10 bg-black/20 px-5 text-sm text-white outline-none placeholder:text-white/35 focus:border-blue-500/50"
              />

              <button className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
                Категория
              </button>

              <button className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
                Бренд
              </button>

              <button className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
                Статус
              </button>
            </div>

            <Link
              href="/nz-console/products/new"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              Создать карточку
            </Link>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035]">
          <div className="hidden grid-cols-[90px_1.35fr_0.8fr_0.7fr_0.65fr_0.7fr_150px] border-b border-white/10 bg-black/25 px-5 py-4 text-sm text-white/45 xl:grid">
            <div>Фото</div>
            <div>Карточка</div>
            <div>Категория</div>
            <div>Бренд</div>
            <div>Позиций</div>
            <div>Статус</div>
            <div className="text-right">Редактировать</div>
          </div>

          <div className="divide-y divide-white/10">
            {productCards.map((product) => {
              const positionCount = productPositions.filter(
                (position) => position.modelSlug === product.slug
              ).length;

              return (
                <div
                  key={product.slug}
                  className="grid gap-5 bg-white/[0.015] p-5 transition-colors hover:bg-blue-500/[0.04] xl:grid-cols-[90px_1.35fr_0.8fr_0.7fr_0.65fr_0.7fr_150px] xl:items-center"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.045] text-xs text-white/25"
                  >
                    Фото
                  </Link>

                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="block text-lg font-bold transition-colors hover:text-blue-400"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-1 text-sm text-white/35">
                      /product/{product.slug}
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-white/45">
                      {product.shortDescription}
                    </p>
                  </div>

                  <AdminCell label="Категория">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/65">
                      {getCategoryName(product.category)}
                    </span>
                  </AdminCell>

                  <AdminCell label="Бренд">{product.brand}</AdminCell>

                  <AdminCell label="Позиций">
                    <Link
                      href="/nz-console/positions"
                      className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-400 transition-colors hover:bg-blue-500/15"
                    >
                      {positionCount}
                    </Link>
                  </AdminCell>

                  <AdminCell label="Статус">
                    <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-300">
                      {getStatusName(product.status)}
                    </span>
                  </AdminCell>

                  <div className="flex flex-wrap gap-2 xl:justify-end">
                    <Link
  href={`/nz-console/products/${product.slug}`}
  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm transition-colors hover:border-blue-500/40 hover:bg-blue-500/10"
>
  Изменить
</Link>

                    <button className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300">
                      Скрыть
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="my-8 rounded-[28px] border border-blue-500/25 bg-blue-500/10 p-6">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Логика
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em]">
            Карточка без цены и наличия
          </h2>

          <p className="mt-3 max-w-[980px] text-sm leading-relaxed text-white/55">
            Материнская карточка хранит название, фото, бренд, категорию,
            описание, характеристики модели и размещение на сайте. Цена,
            наличие, память, цвет, SIM и SKU хранятся в позициях.
          </p>
        </section>
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6">
      <div className="text-sm text-white/45">{label}</div>
      <div className="mt-3 text-4xl font-bold">{value}</div>
    </div>
  );
}

function AdminCell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 text-xs text-white/35 xl:hidden">{label}</div>
      <div className="text-sm text-white/70">{children}</div>
    </div>
  );
}