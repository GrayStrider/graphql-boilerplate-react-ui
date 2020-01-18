import {Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, BaseEntity} from 'typeorm'
import {Task} from '@/models/KBF/entity/main/Task'
import {ObjectType, Field, ID} from 'type-graphql'
import {Board} from '@/models/KBF/entity/main/Board'


@Entity()
@ObjectType()
export class TColumn extends BaseEntity{
	@Field(returns => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string
	
	
	@Field(returns => Board)
	@ManyToOne(type => Board, board => board.columns)
	board: Board
	
	@Field(returns => Task, {nullable: true})
	@OneToMany(type => Task, task => task.column)
	tasks: Task[]
	
}
