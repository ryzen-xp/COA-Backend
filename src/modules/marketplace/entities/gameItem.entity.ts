import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum ItemType {
  WEAPON = "WEAPON",
  ARMOR = "ARMOR",
  POTION = "POTION",
  RESOURCE = "RESOURCE",
  NFT = "NFT",
}

export enum Rarity {
  COMMON = "COMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
}

@Entity("game_items")
export class GameItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: ItemType,
  })
  type: ItemType;

  @Column({
    type: "enum",
    enum: Rarity,
  })
  rarity: Rarity;

  @Column("json", { nullable: true })
  metadata: Record<string, any>;

  @Column({ default: false })
  isNFT: boolean;

  @CreateDateColumn()
  createdAt: Date;
}