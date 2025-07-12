const { TwitterApi } = require('twitter-api-v2');
const cron = require('node-cron');
require('dotenv').config();

class TwitterBot {
    constructor() {
        this.client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_SECRET,
        });
        
        this.rwClient = this.client.readWrite;
        this.communityId = '1943464833229226222';
        this.communityUrl = 'https://x.com/i/communities/1943464833229226222';
        
        this.contentLibrary = [
            'Join our amazing community and connect with like-minded people! 🚀',
            'What are you building today? Share your progress in our community! 💪',
            'Community spotlight: Check out the incredible discussions happening right now! ✨',
            'Tips, tricks, and insights await you in our growing community! 🧠',
            'Weekend vibes: Perfect time to connect and share ideas! 🌟'
        ];
    }

    async postTweet(content) {
        try {
            const tweet = await this.rwClient.v2.tweet(content);
            console.log(`Tweet posted successfully: ${tweet.data.id}`);
            return tweet;
        } catch (error) {
            console.error('Error posting tweet:', error);
        }
    }

    async postCommunityPromotion() {
        const randomContent = this.contentLibrary[Math.floor(Math.random() * this.contentLibrary.length)];
        const content = `${randomContent}\n\n${this.communityUrl}`;
        
        return await this.postTweet(content);
    }

    async likeTweet(tweetId) {
        try {
            await this.rwClient.v2.like(process.env.TWITTER_USER_ID, tweetId);
            console.log(`Liked tweet: ${tweetId}`);
        } catch (error) {
            console.error('Error liking tweet:', error);
        }
    }

    async retweetTweet(tweetId) {
        try {
            await this.rwClient.v2.retweet(process.env.TWITTER_USER_ID, tweetId);
            console.log(`Retweeted: ${tweetId}`);
        } catch (error) {
            console.error('Error retweeting:', error);
        }
    }

    async searchAndEngage(query, maxResults = 10) {
        try {
            const tweets = await this.rwClient.v2.search(query, {
                max_results: maxResults,
                'tweet.fields': ['author_id', 'created_at', 'public_metrics']
            });

            for (const tweet of tweets.data || []) {
                if (tweet.public_metrics.like_count < 100) {
                    await this.likeTweet(tweet.id);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        } catch (error) {
            console.error('Error searching and engaging:', error);
        }
    }

    async getMyTweets() {
        try {
            const tweets = await this.rwClient.v2.userTimeline(process.env.TWITTER_USER_ID, {
                max_results: 10,
                'tweet.fields': ['created_at', 'public_metrics']
            });
            
            return tweets.data || [];
        } catch (error) {
            console.error('Error fetching tweets:', error);
            return [];
        }
    }

    async analyzePerformance() {
        const tweets = await this.getMyTweets();
        
        if (tweets.length === 0) {
            console.log('No tweets found for analysis');
            return;
        }

        const totalLikes = tweets.reduce((sum, tweet) => sum + tweet.public_metrics.like_count, 0);
        const totalRetweets = tweets.reduce((sum, tweet) => sum + tweet.public_metrics.retweet_count, 0);
        const avgLikes = totalLikes / tweets.length;
        const avgRetweets = totalRetweets / tweets.length;

        console.log('Performance Analytics:');
        console.log(`Total tweets analyzed: ${tweets.length}`);
        console.log(`Average likes per tweet: ${avgLikes.toFixed(2)}`);
        console.log(`Average retweets per tweet: ${avgRetweets.toFixed(2)}`);
        console.log(`Total engagement: ${totalLikes + totalRetweets}`);
    }

    startScheduledTasks() {
        cron.schedule('0 9,15,21 * * *', async () => {
            console.log('Running scheduled community promotion...');
            await this.postCommunityPromotion();
        });

        cron.schedule('30 */2 * * *', async () => {
            console.log('Running engagement activities...');
            await this.searchAndEngage('community building OR networking OR collaboration', 5);
        });

        cron.schedule('0 18 * * 0', async () => {
            console.log('Running weekly analytics...');
            await this.analyzePerformance();
        });

        console.log('Scheduled tasks started successfully!');
    }

    async run() {
        try {
            console.log('Twitter Bot starting...');
            
            await this.postTweet('🤖 Community Growth Bot is now active! Ready to help grow our amazing community! 🚀');
            
            this.startScheduledTasks();
            
            console.log('Bot is running! Press Ctrl+C to stop.');
            
        } catch (error) {
            console.error('Failed to start bot:', error);
        }
    }
}

if (require.main === module) {
    const bot = new TwitterBot();
    bot.run();
}

module.exports = TwitterBot;