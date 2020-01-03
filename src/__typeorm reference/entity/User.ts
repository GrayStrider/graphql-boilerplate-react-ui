import {Field, ID, ObjectType, Root} from 'type-graphql'
import {BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
import {howCommonIsName} from '../../utils/_'
import {Countries} from '../User/CountriesList'

export type TUserNew = typeof UserNew & {friends: UserNew[]}

const UserDescription = `Unique user ID.
This field suppports **formatting** and [links](https://google.com).`

@ObjectType()
@Entity()
export class UserNew extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(returns => ID, {description: UserDescription})
	id: string
	
	@Field()
	@Column()
	firstName: string
	
	@Field()
	@Column({nullable: true})
	lastName: string
	
	@Field()
	@Column({type: 'text', unique: true})
	email: string
	
	@Field()
	@Column()
	password: string
	
	@Field()
	@Column('int')
	age: number
	
	@CreateDateColumn()
	@Field()
	createdDate: string
	
	@Field(returns => String)
	async howCommonIsName() {
		return await howCommonIsName(this.firstName, this.lastName)
	}
	
	@Field(returns => Countries)
	@Column({type: 'enum', enum: Countries})
	country: Countries
	
	@Field({complexity: 3})
	name(@Root() parent: UserNew): string {
		return `${parent.firstName}${parent.lastName ? ' ' + parent.lastName : ''}`
	}
	
	@Field(returns => [UserNew])
	friends(): UserNew[] {
		
		return [...(this.friendsPrimary ?? []), ...(this.friendsInverse ?? [])]
	}
	
	@JoinTable()
	@ManyToMany(type => UserNew, friends => friends.friendsInverse, {cascade: ["insert", "update"]})
	// @Field(returns => [UserNew], {nullable: true})
	friendsPrimary: UserNew[]
	
	// @Field(returns => [UserNew])
	@ManyToMany(type => UserNew, friends => friends.friendsPrimary)
	friendsInverse: UserNew[]
}
