import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PublisherRequest } from './dto/publisher.request';
import { PublisherResponse } from './dto/publisher.response';
import { SubscriberRequest } from './dto/subscriber.request';
import { SubscriberResponse } from './dto/subscriber.response';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('subscribe/:topic')
	subscribe(
		@Body() subscriber: SubscriberRequest,
		@Param('topic') topic: string
	): SubscriberResponse {
		return this.appService.subscribe(topic, subscriber.url);
	}

	@Post('publish/:topic')
	publish(
		@Body() message: PublisherRequest,
		@Param('topic') topic: string
	): PublisherResponse {
		return this.appService.publish(topic, message);
	}
}
