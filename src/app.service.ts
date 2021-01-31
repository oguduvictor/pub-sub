import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { PublisherRequest } from './dto/publisher.request';
import { PublisherResponse } from './dto/publisher.response';
import { SubscriberResponse } from './dto/subscriber.response';

@Injectable()
export class AppService {
	publisher: redis.RedisClient;

	constructor() {
		this.publisher = redis.createClient();
	}

	subscribe(topic: string, subscriber: string): SubscriberResponse {
		const subscriberClient = redis.createClient(subscriber);

		subscriberClient.subscribe(topic);

		return {
			topic,
			url: subscriber
		} as SubscriberResponse; 
	}

	publish(topic: string, message: PublisherRequest): PublisherResponse {
		this.publisher.publish(topic, JSON.stringify(message));

		return {
			topic: topic,
			data: message
		} as PublisherResponse;
	}
}
