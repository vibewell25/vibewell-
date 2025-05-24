import { prisma } from './index';
import { Prisma } from '@prisma/client';

// Types
export type ServiceWithProvider = Prisma.ServiceGetPayload<{
  include: { provider: true };
}>;

export type ServiceInput = {
  name: string;
  description?: string;
  duration: number;
  price: number;
  providerId: string;
  category?: string;
  images?: string[];
};

// Get all services with optional filtering
export async function getServices({
  category,
  search,
  limit = 10,
  offset = 0,
}: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
} = {}) {
  const where: Prisma.ServiceWhereInput = {};

  if (category) {
    where.category = category;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [services, total] = await Promise.all([
    prisma.service.findMany({
      where,
      include: {
        provider: true,
      },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.service.count({ where }),
  ]);

  return { services, total };
}

// Get service by ID
export async function getServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id },
    include: {
      provider: true,
    },
  });
}

// Create a new service
export async function createService(data: ServiceInput) {
  return prisma.service.create({
    data,
    include: {
      provider: true,
    },
  });
}

// Update a service
export async function updateService(id: string, data: Partial<ServiceInput>) {
  return prisma.service.update({
    where: { id },
    data,
    include: {
      provider: true,
    },
  });
}

// Delete a service
export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id },
  });
}

// Get services by provider ID
export async function getServicesByProvider(providerId: string) {
  return prisma.service.findMany({
    where: { providerId },
    include: {
      provider: true,
    },
    orderBy: { createdAt: 'desc' },
  });
} 