import { ChannelType, type UUID } from '@voidcatos/core';

export interface Room {
  id: string;
  name: string;
  type: ChannelType;
  entities: { id: string; agentId?: string }[];
}
