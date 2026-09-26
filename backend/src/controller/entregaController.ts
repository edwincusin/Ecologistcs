import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import prisma from "../database/prisma.js";

// ============================================
// CREAR una nueva entrega
// POST /inventario/entregas
// ============================================
export const crearEntrega = async (req: Request, res: Response) => {
  const { guia, destinatario, montoCobro, fotoBase64 } = req.body;

  // Validación básica de campos obligatorios
  if (!guia || !destinatario || montoCobro === undefined) {
    return res.status(400).json({
      error: "Los campos guia, destinatario y montoCobro son obligatorios",
    });
  }

  if (typeof montoCobro !== "number" || montoCobro < 0) {
    return res.status(400).json({
      error: "montoCobro debe ser un número positivo",
    });
  }

  try {
    const nuevaEntrega = await prisma.entrega.create({
      data: {
        guia,
        destinatario,
        montoCobro,
        fotoBase64: fotoBase64 ?? null,
      },
    });

    return res.status(201).json(nuevaEntrega);
  } catch (error) {
    // Error específico: la guía ya existe (violación del @unique)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        error: `Ya existe una entrega registrada con la guía "${guia}"`,
      });
    }

    console.error("Error al crear entrega:", error);
    return res.status(500).json({ error: "Error interno al crear la entrega" });
  }
};

// ============================================
// OBTENER todas las entregas
// GET /inventario/entregas
// ============================================
export const obtenerEntregas = async (_req: Request, res: Response) => {
  try {
    const entregas = await prisma.entrega.findMany({
      orderBy: { fecha: "desc" },
    });

    return res.status(200).json(entregas);
  } catch (error) {
    console.error("Error al obtener entregas:", error);
    return res.status(500).json({ error: "Error interno al obtener las entregas" });
  }
};

// ============================================
// OBTENER una entrega por ID
// GET /inventario/entregas/:id
// ============================================
export const obtenerEntregaPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El id debe ser un número" });
  }

  try {
    const entrega = await prisma.entrega.findUnique({
      where: { id },
    });

    if (!entrega) {
      return res.status(404).json({ error: "Entrega no encontrada" });
    }

    return res.status(200).json(entrega);
  } catch (error) {
    console.error("Error al obtener entrega:", error);
    return res.status(500).json({ error: "Error interno al obtener la entrega" });
  }
};

// ============================================
// ACTUALIZAR una entrega existente
// PUT /inventario/entregas/:id
// ============================================
export const actualizarEntrega = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { guia, destinatario, montoCobro, fotoBase64 } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "El id debe ser un número" });
  }

  if (montoCobro !== undefined && (typeof montoCobro !== "number" || montoCobro < 0)) {
    return res.status(400).json({
      error: "montoCobro debe ser un número positivo",
    });
  }

  try {
    const entregaActualizada = await prisma.entrega.update({
      where: { id },
      data: {
        ...(guia !== undefined && { guia }),
        ...(destinatario !== undefined && { destinatario }),
        ...(montoCobro !== undefined && { montoCobro }),
        ...(fotoBase64 !== undefined && { fotoBase64 }),
      },
    });

    return res.status(200).json(entregaActualizada);
  } catch (error) {
    // Error específico: no existe una entrega con ese id
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Entrega no encontrada" });
    }

    // Error específico: la nueva guía ya existe en otra entrega
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        error: `Ya existe otra entrega registrada con la guía "${guia}"`,
      });
    }

    console.error("Error al actualizar entrega:", error);
    return res.status(500).json({ error: "Error interno al actualizar la entrega" });
  }
};

// ============================================
// ELIMINAR una entrega
// DELETE /inventario/entregas/:id
// ============================================
export const eliminarEntrega = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El id debe ser un número" });
  }

  try {
    await prisma.entrega.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Entrega no encontrada" });
    }

    console.error("Error al eliminar entrega:", error);
    return res.status(500).json({ error: "Error interno al eliminar la entrega" });
  }
};