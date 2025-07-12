const TwitterBot = require('./bot');
const cron = require('node-cron');

class CommunityGrowthBot extends TwitterBot {
    constructor() {
        super();
        
        this.engagementKeywords = [
            'startup', 'entrepreneur', 'innovation', 'technology',
            'community', 'networking', 'collaboration', 'growth',
            'business', 'product', 'development', 'creator'
        ];
        
        this.replyTemplates = [
            "Great point! Would love to have you join our community to discuss this further: {communityUrl}",
            "This resonates with many in our community! Feel free to share your thoughts here: {communityUrl}",
            "Interesting perspective! Our community would benefit from your insights: {communityUrl}",
            "Love this discussion! Join us for more conversations like this: {communityUrl}"
        ];
    }

    async findCommunityMembers() {
        try {
            const searchQueries = [
                'entrepreneur community',
                'startup founders',
                'tech innovators',
                'business networking'
            ];
            
            const members = [];
            
            for (const query of searchQueries) {
                const tweets = await this.rwClient.v2.search(query, {
                    max_results: 10,
                    'tweet.fields': ['author_id', 'created_at', 'public_metrics'],
                    'user.fields': ['username', 'public_metrics']
                });
                
                if (tweets.data) {
                    for (const tweet of tweets.data) {
                        if (tweet.public_metrics.like_count > 5 && tweet.public_metrics.like_count < 50) {
                            members.push({
                                tweetId: tweet.id,
                                authorId: tweet.author_id,
                                content: tweet.text
                            });
                        }
                    }
                }
                
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            return members;
        } catch (error) {
            console.error('Error finding community members:', error);
            return [];
        }
    }

    async engageWithPotentialMembers() {
        const members = await this.findCommunityMembers();
        
        for (const member of members.slice(0, 5)) {
            try {
                await this.likeTweet(member.tweetId);
                
                if (Math.random() < 0.3) {
                    const template = this.replyTemplates[Math.floor(Math.random() * this.replyTemplates.length)];
                    const reply = template.replace('{communityUrl}', this.communityUrl);
                    
                    await this.rwClient.v2.reply(reply, member.tweetId);
                    console.log(`Replied to tweet: ${member.tweetId}`);
                }
                
                await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (error) {
                console.error(`Error engaging with member ${member.tweetId}:`, error);
            }
        }
    }

    async postCommunityHighlights() {
        const highlights = [
            `🌟 Community Highlight: Amazing discussions happening daily in our space!\n\nJoin conversations about:\n• Innovation & Tech\n• Startup Journey\n• Networking Tips\n• Growth Strategies\n\n${this.communityUrl}`,
            
            `💡 This Week in Community:\n\n✨ New member introductions\n🚀 Startup showcase discussions\n🤝 Collaboration opportunities\n📈 Growth insights shared\n\nBe part of the conversation: ${this.communityUrl}`,
            
            `🔥 Trending in our community:\n\n"The power of authentic connections in business"\n\nWhat's your take? Join the discussion and share your insights!\n\n${this.communityUrl}`,
            
            `🚀 Weekend Community Challenge:\n\nShare ONE tip that helped you grow your network or business!\n\nLet's learn from each other: ${this.communityUrl}`
        ];
        
        const highlight = highlights[Math.floor(Math.random() * highlights.length)];
        return await this.postTweet(highlight);
    }

    async shareSuccessStories() {
        const stories = [
            `📈 Community Success Story:\n\n"Thanks to the connections I made here, I found my co-founder and we just launched our MVP!"\n\nThis is why community matters. Your success story could be next! 🎉\n\n${this.communityUrl}`,
            
            `🎯 Member Spotlight:\n\nOne of our community members just secured their first round of funding! 💰\n\nThe power of networking and mutual support in action.\n\nWhat goals are you working toward? Share in our community!\n\n${this.communityUrl}`,
            
            `🤝 Connection Success:\n\nTwo members met in our community last month and are now collaborating on an exciting project!\n\nReal relationships. Real opportunities. Real results.\n\n${this.communityUrl}`
        ];
        
        const story = stories[Math.floor(Math.random() * stories.length)];
        return await this.postTweet(story);
    }

    async runWeeklyEngagement() {
        console.log('Running weekly community engagement...');
        
        await this.engageWithPotentialMembers();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await this.postCommunityHighlights();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (Math.random() < 0.7) {
            await this.shareSuccessStories();
        }
        
        console.log('Weekly engagement completed!');
    }

    startCommunitySchedule() {
        super.startScheduledTasks();
        
        cron.schedule('0 12 * * 1,3,5', async () => {
            console.log('Running community highlights...');
            await this.postCommunityHighlights();
        });
        
        cron.schedule('0 16 * * 2,4', async () => {
            console.log('Engaging with potential members...');
            await this.engageWithPotentialMembers();
        });
        
        cron.schedule('0 14 * * 6', async () => {
            console.log('Sharing success stories...');
            await this.shareSuccessStories();
        });
        
        cron.schedule('0 10 * * 0', async () => {
            console.log('Running weekly engagement...');
            await this.runWeeklyEngagement();
        });
    }

    async run() {
        try {
            console.log('Community Growth Bot starting with enhanced features...');
            
            await this.postTweet(`🚀 Enhanced Community Growth Bot v2.0 is now active! (${new Date().toLocaleTimeString()})\n\nNew features:\n✨ Member engagement\n🎯 Success story sharing\n📈 Weekly highlights\n🤝 Smart networking\n\nLet\'s grow together!`);
            
            this.startCommunitySchedule();
            
            console.log('Enhanced bot is running! Press Ctrl+C to stop.');
            
        } catch (error) {
            console.error('Failed to start enhanced bot:', error);
        }
    }
}

if (require.main === module) {
    const bot = new CommunityGrowthBot();
    bot.run();
}

module.exports = CommunityGrowthBot;