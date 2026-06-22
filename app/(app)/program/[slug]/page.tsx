import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { programPages } from "@/data/program"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

function getProgram(slug: string) {
  return programPages.find((program) => program.slug === slug)
}

export function generateStaticParams() {
  return programPages.map((program) => ({
    slug: program.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const program = getProgram(slug)

  if (!program) {
    return {
      title: "Program Not Found | Aadhyanta Fund Management",
    }
  }

  return {
    title: `${program.programName} | Aadhyanta Fund Management`,
    description: program.oneLiner,
  }
}

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
}

function StatusBadge({ status }: { status: "Active" | "Completed" }) {
  const isActive = status === "Active"

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
      }`}
    >
      {status}
    </span>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}

function SimpleList({
  items,
  columns = false,
}: {
  items: string[]
  columns?: boolean
}) {
  return (
    <div
      className={
        columns
          ? "grid gap-4 md:grid-cols-2"
          : "grid gap-4"
      }
    >
      {items.map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm leading-6 text-slate-700">{item}</p>
        </div>
      ))}
    </div>
  )
}

export default async function ProgramSlugPage({ params }: PageProps) {
  const { slug } = await params

  const program = getProgram(slug)

  if (!program) {
    notFound()
  }

  const partnerEntries = Object.entries(program.partnerAndFunder).filter(
    ([, value]) => {
      if (Array.isArray(value)) return value.length > 0
      return Boolean(value)
    }
  )

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <Link
            href="/program"
            className="inline-flex items-center text-sm font-medium text-slate-300 transition hover:text-white"
          >
            ← Back to Programs
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={program.status} />

                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15">
                  Aadhyanta Program
                </span>
              </div>

              <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
                {program.programName}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                {program.oneLiner}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                Partner & Funder
              </p>

              <p className="mt-4 text-base leading-7 text-white">
                {program.funderTag}
              </p>
            </div>
          </div>

          {program.keyNumbers?.length ? (
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {program.keyNumbers.map((number) => (
                <div
                  key={`${number.value}-${number.label}`}
                  className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur"
                >
                  <p className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                    {number.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-300">
                    {number.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionHeader
              eyebrow="Overview"
              title="Programme context and purpose"
              description="A closer look at the programme design, enterprise journey, and the value created through Aadhyanta’s acceleration platform."
            />

            <div className="space-y-6">
              {program.overview.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-700 md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who was this for */}
      {program.whoWasThisFor?.length ? (
        <section className="border-y border-slate-200 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <SectionHeader
                eyebrow="Target Group"
                title="Who this programme supported"
              />

              <SimpleList items={program.whoWasThisFor} columns />
            </div>
          </div>
        </section>
      ) : null}

      {/* Deliverables */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Deliverables"
            title="What the programme delivered"
            description="The programme combined diagnostics, practical capacity building, mentorship, financial preparation, and investor-facing support."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {program.programDeliverables.map((deliverable) => (
              <div
                key={deliverable}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                  ✓
                </div>

                <p className="text-sm leading-6 text-slate-700">
                  {deliverable}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      {program.journey?.length ? (
        <section className="border-y border-slate-200 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeader
              eyebrow="Programme Journey"
              title="From selection to investment readiness"
              description="Each programme was designed as a structured enterprise journey rather than a one-off training activity."
            />

            <div className="mt-14 space-y-6">
              {program.journey.map((step, index) => (
                <div
                  key={`${step.title}-${index}`}
                  className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[120px_1fr]"
                >
                  <div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">
                      {step.title}
                    </h3>

                    {step.description ? (
                      <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                        {step.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Components */}
      {program.components?.length ? (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeader
              eyebrow="Programme Components"
              title="Core components"
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {program.components.map((component) => (
                <div
                  key={component.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {component.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                    {component.description}
                  </p>

                  {component.details?.length ? (
                    <ul className="mt-6 space-y-3">
                      {component.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex gap-3 text-sm leading-6 text-slate-700"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-950" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Tools / Platforms / Criteria / Value Chains */}
      {program.toolsUsed?.length ||
      program.toolsAndPlatforms?.length ||
      program.evaluationCriteria?.length ||
      program.valueChains?.length ? (
        <section className="border-y border-slate-200 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {program.toolsUsed?.length ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-950">
                    Tools Used
                  </h3>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {program.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {program.toolsAndPlatforms?.length ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-950">
                    Tools & Platforms
                  </h3>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {program.toolsAndPlatforms.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {program.evaluationCriteria?.length ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-950">
                    Evaluation Criteria
                  </h3>

                  <ul className="mt-6 space-y-3">
                    {program.evaluationCriteria.map((criteria) => (
                      <li
                        key={criteria}
                        className="flex gap-3 text-sm leading-6 text-slate-700"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-950" />
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {program.valueChains?.length ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-950">
                    Value Chains
                  </h3>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {program.valueChains.map((chain) => (
                      <span
                        key={chain}
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {chain}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Outcomes */}
      {program.outcomes?.length || program.alumniOutcomes?.length ? (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeader
              eyebrow="Outcomes"
              title="Results and enterprise-level outcomes"
            />

            {program.outcomes?.length ? (
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {program.outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <p className="text-sm leading-7 text-slate-700">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {program.alumniOutcomes?.length ? (
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {program.alumniOutcomes.map((alumni) => (
                  <div
                    key={`${alumni.company}-${alumni.outcome}`}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    {alumni.badge ? (
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {alumni.badge}
                      </span>
                    ) : null}

                    <h3 className="mt-4 text-xl font-semibold text-slate-950">
                      {alumni.company}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {alumni.outcome}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Success Story */}
      {program.successStory ? (
        <section className="border-y border-slate-200 bg-slate-950 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                Success Story
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {program.successStory.title}
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
                {program.successStory.description}
              </p>

              {program.successStory.link ? (
                <Link
                  href={program.successStory.link}
                  className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Read Story
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Notes */}
      {program.sustainabilityNote || program.genderLensNote ? (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {program.sustainabilityNote ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Sustainability
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                    {program.sustainabilityNote}
                  </p>
                </div>
              ) : null}

              {program.genderLensNote ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Gender Lens
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                    {program.genderLensNote}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Partner Details */}
      {partnerEntries.length ? (
        <section className="border-y border-slate-200 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeader
              eyebrow="Institutional Partnership"
              title="Partner and funder details"
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {partnerEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {formatLabel(key)}
                  </p>

                  {Array.isArray(value) ? (
                    <div className="mt-4 space-y-2">
                      {value.map((item) => (
                        <p
                          key={item}
                          className="text-base font-medium text-slate-950"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-base font-medium leading-7 text-slate-950">
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-950 px-6 py-14 text-center shadow-2xl md:px-12 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
              Work With Aadhyanta
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Building investment-ready enterprises across Nepal.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Aadhyanta combines enterprise acceleration, capital readiness,
              investor engagement, and long-term value creation for Nepal’s
              growth-stage businesses.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact-us"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Contact Us
              </Link>

              <Link
                href="/program"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}