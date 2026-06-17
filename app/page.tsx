import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-background to-background" />

        <div className="container relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border px-4 py text-[11px] font-bold">
              🚀 CFDI 4.0 • SAT • XML • PDF
            </span>

            <h1 className="
              mt-8 text-5xl font-bold tracking-tight md:text-7xl
              bg-linear-to-r
              from-zinc-900 via-zinc-500 to-zinc-100
              dark:from-zinc-100 dark:via-white dark:to-zinc-400
              bg-size-[300%_100%]
              bg-clip-text text-transparent
              animate-gradient
            ">
              Facturación electrónica para negocios modernos
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Emite facturas CFDI 4.0, administra clientes, productos y consulta
              todos tus comprobantes desde una plataforma rápida, intuitiva y
              segura.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/sign-up">Prueba gratis</Link>
              </Button>

              <Button variant="outline" size="lg">
                Ver demostración
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="container mx-auto max-w-7xl px-6 py-24"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Todo lo que necesitas para facturar
          </h2>

          <p className="mt-4 text-muted-foreground">
            Diseñado para freelancers, PyMEs y empresas.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "CFDI 4.0",
              description:
                "Genera comprobantes válidos ante el SAT en segundos.",
            },
            {
              title: "Clientes",
              description:
                "Administra y reutiliza información de clientes fácilmente.",
            },
            {
              title: "Productos",
              description:
                "Catálogo centralizado para acelerar la facturación.",
            },
            {
              title: "XML y PDF",
              description:
                "Descarga y comparte tus comprobantes cuando quieras.",
            },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Cómo funciona</h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>1. Registra tu empresa</CardTitle>
              </CardHeader>
              <CardContent>
                Configura tus datos fiscales en pocos minutos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Agrega clientes</CardTitle>
              </CardHeader>
              <CardContent>
                Guarda información para reutilizarla en futuras facturas.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Emite CFDIs</CardTitle>
              </CardHeader>
              <CardContent>
                Genera, descarga y comparte XML y PDF al instante.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="container mx-auto max-w-7xl px-6 py-24"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold">Precios simples</h2>

          <p className="mt-4 text-muted-foreground">
            Sin contratos ni costos ocultos.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Ideal para freelancers y pequeños negocios.</CardDescription>
            </CardHeader>

            <CardContent>
              <h3 className="text-5xl font-bold">$0</h3>
              <p className="text-muted-foreground">MXN / mes</p>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex flex-col">✓  Facturación CFDI 4.0 <span className="text-[11px]">(Costo por Timbre: $5.00 MXN)</span></li>
                <li>✓ Descarga XML y PDF</li>
                <li>✓ Soporte estándar</li>
              </ul>

              <Button className="mt-8 w-full">Comenzar</Button>
            </CardContent>
          </Card>

          <Card className="border-primary shadow-xl">
            <CardHeader>
              <div className="mb-2 w-fit rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                Más popular
              </div>

              <CardTitle>Business</CardTitle>
              <CardDescription>Para PyMEs y negocios en crecimiento</CardDescription>
            </CardHeader>

            <CardContent>
              <h3 className="text-5xl font-bold">$99</h3>
              <p className="text-muted-foreground">MXN / mes</p>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex flex-col">✓  Facturación CFDI 4.0 <span className="text-[11px]">(Costo por Timbre: $3.00 MXN)</span></li>
                <li>✓ Todo lo del plan starter</li>
                <li>✓ Registro de clientes ilimitados</li>
                <li>✓ Registro de productos ilimitados</li>
                <li>✓ Soporte prioritario</li>
              </ul>

              <Button className="mt-8 w-full">Comenzar</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>Grandes empresas</CardDescription>
            </CardHeader>

            <CardContent>
              <h3 className="text-5xl font-bold">$999</h3>
              <p className="text-muted-foreground">MXN / mes</p>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex flex-col">✓  Facturación CFDI 4.0 <span className="text-[11px]">(Costo por Timbre: $1.00 MXN)</span></li>
                <li>✓ Todo el plan business</li>
                <li>✓ Multiusuarios</li>
                <li>✓ Soporte dedicado</li>
              </ul>

              <Button className="mt-8 w-full" variant="outline">
                Contactar ventas
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials 
      <section className="border-y bg-muted/30">
        <div className="container mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-center text-4xl font-bold">
            Lo que dicen nuestros clientes
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <p>
                  Redujimos el tiempo de facturación de horas a minutos.
                </p>

                <div className="mt-4">
                  <p className="font-semibold">Juan Pérez</p>
                  <p className="text-sm text-muted-foreground">
                    Director Financiero
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p>
                  La mejor herramienta para administrar CFDIs y clientes.
                </p>

                <div className="mt-4">
                  <p className="font-semibold">Ana García</p>
                  <p className="text-sm text-muted-foreground">Contadora</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p>
                  Muy fácil de usar y con una interfaz excelente.
                </p>

                <div className="mt-4">
                  <p className="font-semibold">Carlos Ruiz</p>
                  <p className="text-sm text-muted-foreground">CEO</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>*/}

      {/* FAQ */}
      <section id="faq" className="container mx-auto max-w-4xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Preguntas frecuentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          <AccordionItem value="1">
            <AccordionTrigger>
              ¿Es compatible con CFDI 4.0?
            </AccordionTrigger>
            <AccordionContent>
              Sí, el sistema genera comprobantes compatibles con CFDI 4.0.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="2">
            <AccordionTrigger>
              ¿Puedo descargar XML y PDF?
            </AccordionTrigger>
            <AccordionContent>
              Sí, todos los comprobantes pueden descargarse en ambos formatos.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="3">
            <AccordionTrigger>
              ¿Existe prueba gratuita?
            </AccordionTrigger>
            <AccordionContent>
              Sí, puedes comenzar sin costo y explorar la plataforma.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>


      {/* Team */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Construido por desarrolladores para negocios
          </h2>

          <p className="mt-4 text-muted-foreground">
            Un equipo con experiencia en fintech, software y productos digitales.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Miguel Castañeda",
              role: "Software Engineer II",
              company: "BBVA",
              experience: "3 años de experiencia",
              avatar: "/team/mike.png",
              badges: ["Ex-Clip", "Ex-Banxico"],
            },
            {
              name: "Adan Palacios",
              role: "Software Engineer Sr.",
              company: "Mercado Libre",
              experience: "7 años de experiencia",
              avatar: "/team/adan.jpg",
              badges: ["Ex-Clip"],
            },
            {
              name: "Gonzalo Hernández",
              role: "Software Engineer II",
              company: "BBVA",
              experience: "4 años de experiencia",
              avatar: "/team/gonzalo.jpg",
              badges: ["Ex-Totalplay"],
            },
          ].map((member) => (
            <Card key={member.name}>
              <CardContent className="flex flex-col items-center p-8 text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={member.avatar}
                    alt={member.name}
                  />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <h3 className="mt-6 text-xl font-semibold">
                  {member.name}
                </h3>

                <p className="text-primary font-medium">
                  {member.role}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Actualmente en <strong>{member.company}</strong>
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {member.badges.map((badge) => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 rounded-full border px-3 py-1 text-xs">
                  {member.experience}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-7xl px-6 pb-24">
        <Card>
          <CardContent className="flex flex-col items-center p-16 text-center">
            <h2 className="text-4xl font-bold">
              Comienza a facturar hoy mismo
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Únete a cientos de negocios que simplifican su operación fiscal.
            </p>

            <Button size="lg" className="mt-8" asChild>
              <Link href="/sign-up">
                Crear cuenta gratis
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>



      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:justify-between">
          <div>
            <h3 className="font-bold text-lg">Billing v2</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Plataforma moderna de facturación electrónica CFDI 4.0.
            </p>
          </div>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#">Términos</Link>
            <Link href="#">Privacidad</Link>
            <Link href="#">Contacto</Link>
          </div>
        </div>
      </footer>
    </>
  );
}