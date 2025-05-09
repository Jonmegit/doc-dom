"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

interface CheckoutFormProps {
  plan: {
    id: string
    nombre: string
    precio: number
  }
}

export function CheckoutForm({ plan }: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    empresa: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    pais: "",
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
    metodoPago: "tarjeta",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, metodoPago: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: `${formData.nombre} ${formData.apellidos}`,
          plan: plan.id,
          // Aquí irían los datos de pago en un entorno real
        }),
      })

      if (response.ok) {
        router.push("/checkout/confirmacion")
      } else {
        const data = await response.json()
        alert(`Error: ${data.error || "Ha ocurrido un error al procesar el pago"}`)
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      alert("Ha ocurrido un error al procesar el pago")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Información de cuenta</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Tu nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                placeholder="Tus apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Crea una contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="empresa">Empresa (opcional)</Label>
            <Input id="empresa" placeholder="Nombre de tu empresa" value={formData.empresa} onChange={handleChange} />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Información de facturación</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              placeholder="Calle, número, piso..."
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input id="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigoPostal">Código Postal</Label>
              <Input
                id="codigoPostal"
                placeholder="Código postal"
                value={formData.codigoPostal}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pais">País</Label>
            <Input id="pais" placeholder="País" value={formData.pais} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
        <RadioGroup value={formData.metodoPago} onValueChange={handleRadioChange} className="space-y-3">
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="tarjeta" id="tarjeta" />
            <Label htmlFor="tarjeta" className="flex-1">
              Tarjeta de crédito/débito
            </Label>
            <div className="flex space-x-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="5" width="20" height="14" rx="2" fill="#1A1A1A" />
                <rect x="5" y="12" width="14" height="2" fill="#FFB74D" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="5" width="20" height="14" rx="2" fill="#252525" />
                <circle cx="9" cy="12" r="4" fill="#FF5252" fillOpacity="0.8" />
                <circle cx="15" cy="12" r="4" fill="#FFC107" fillOpacity="0.8" />
              </svg>
            </div>
          </div>
          <div className="rounded-md border p-3 space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex-1">
                PayPal
              </Label>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.0746 8.19165C20.1364 7.89398 20.1667 7.59925 20.1667 7.3125C20.1667 5.53665 18.7175 4.08748 16.9417 4.08748H11.1667C10.8058 4.08748 10.4945 4.32498 10.3908 4.67498L7.6875 13.9166C7.62917 14.1108 7.66667 14.3225 7.78333 14.4858C7.9 14.6491 8.0875 14.75 8.29167 14.75H10.3333L9.99167 15.9166C9.94583 16.0641 9.97083 16.2233 10.0625 16.35C10.1542 16.4766 10.3 16.5416 10.4583 16.5416H13.4167C13.7183 16.5416 13.9833 16.3391 14.0667 16.0466L14.7083 13.9166L16.5833 13.9375C16.9442 13.9375 17.2558 13.7 17.3592 13.35L18.2083 10.5833H19.5C19.7042 10.5833 19.8917 10.4825 20.0083 10.3191C20.125 10.1558 20.1625 9.94415 20.1042 9.74998L20.0746 8.19165Z"
                  fill="#0070BA"
                />
                <path
                  d="M6.3746 6.60004C6.43293 6.30238 6.46293 6.00765 6.46293 5.7209C6.46293 3.94504 5.01376 2.49587 3.2379 2.49587H2.91667C2.55584 2.49587 2.24459 2.73337 2.14084 3.08337L0.0204202 10.5834C-0.0379131 10.7775 0.000420295 10.9892 0.117087 11.1525C0.233753 11.3159 0.421253 11.4167 0.625003 11.4167H2.66667L4.16667 5.7209C4.25001 5.42923 4.52084 5.2209 4.82501 5.2209H6.3746V6.60004Z"
                  fill="#003087"
                />
                <path
                  d="M16.5833 13.9375H14.7083L14.0667 16.0466C13.9833 16.3391 13.7183 16.5416 13.4167 16.5416H10.4583C10.3 16.5416 10.1542 16.4766 10.0625 16.35C9.97083 16.2233 9.94583 16.0641 9.99167 15.9166L10.3333 14.75H8.29167C8.0875 14.75 7.9 14.6491 7.78333 14.4858C7.66667 14.3225 7.62917 14.1108 7.6875 13.9166L10.3908 4.67498C10.4945 4.32498 10.8058 4.08748 11.1667 4.08748H16.9417C18.7175 4.08748 20.1667 5.53665 20.1667 7.3125C20.1667 7.59925 20.1364 7.89398 20.0746 8.19165L20.1042 9.74998C20.1625 9.94415 20.125 10.1558 20.0083 10.3191C19.8917 10.4825 19.7042 10.5833 19.5 10.5833H18.2083L17.3592 13.35C17.2558 13.7 16.9442 13.9375 16.5833 13.9375Z"
                  fill="#003087"
                />
              </svg>
            </div>
          </div>
        </RadioGroup>

        {formData.metodoPago === "tarjeta" && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numeroTarjeta">Número de tarjeta</Label>
              <Input
                id="numeroTarjeta"
                placeholder="1234 5678 9012 3456"
                value={formData.numeroTarjeta}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaExpiracion">Fecha de expiración</Label>
                <Input
                  id="fechaExpiracion"
                  placeholder="MM/AA"
                  value={formData.fechaExpiracion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} required />
              </div>
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Procesando..." : "Completar compra"}
      </Button>
    </form>
  )
}
