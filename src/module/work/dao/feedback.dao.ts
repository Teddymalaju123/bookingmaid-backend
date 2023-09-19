import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/entities/feedback';
import { Repository } from 'typeorm';


@Injectable()
export class FeedbackDao {
    constructor(
        @InjectRepository(Feedback)
        private readonly feedbackRepository: Repository<Feedback>,
    ) { }
    async findFeedback() { 
        try {
            const query = ` SELECT * FROM feedback join user on feedback.id_user = user.id_user WHERE user.type_id = '2' `;
            const results = await this.feedbackRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('Failed');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed : ${error.message}`);
        }
    }




}
