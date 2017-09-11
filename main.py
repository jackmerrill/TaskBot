import discord
from discord.ext import commands
import random
import os

description = '''TaskBot is for managing tasks for you and your Discord!'''
bot = commands.Bot(command_prefix='&', description=description)

@bot.event
async def on_ready():
    print('Logged in as')
    print(bot.user.name)
    print(bot.user.id)
    print('------')
@bot.command()
async def hi():
    """Hi"""
    await bot.say('Hello!')

@bot.command()
async def roll(dice : str):
    """Rolls a dice in NdN format. It's &roll (number)"""
    try:
        rolls, limit = map(int, dice.split('d'))
    except Exception:
        await bot.say('Format has to be in NdN!')
        return

    result = ', '.join(str(random.randint(1, limit)) for r in range(rolls))
    await bot.say(result)

@bot.command(pass_context=True)
async def new(ctx, arg):
    """Makes a new TaskList."""
    client = discord.Client
    server = discord.Server
    await server.create_channel(server, 'TaskList', type=discord.ChannelType.text)
    await bot.say('Made a new TaskList!')
# async def new(ctx, arg: discord.Channel):
#     """Makes a new TaskList"""
#     if arg == "":
#         await bot.say('Please provide a channel like this: ?new #channelname')
#     elif arg != "":
#         await bot.say('Made a new TaskList in channel ' + arg.name + '!')
#         channelID = discord.Client().get_channel(id)
#         client.send_message(client.get_channel(id), 'message')

@bot.command()
async def add(ctx, arg):
    """Adds a task to the TaskList"""
    await bot.say('Added to the list!')

@bot.command()
async def joined(member : discord.Member):
    """Says when a member joined."""
    await bot.say('{0.name} joined in {0.joined_at}'.format(member))

@bot.command()
async def ping():
    """Says Pong!"""
    await bot.say('Pong!')

@bot.command()
async def invite():
    """Gives the you an invite to add to your discord"""
    await bot.say('Here is the invite code: https://discordapp.com/oauth2/authorize?client_id=335591769414696961&scope=bot&permissions=2146958591')

@bot.command()
async def gethelp():
    """Sends a message to all staff."""
    await bot.say('Sorry, but this feature isnt out yet! Keep an eye out!')
    # client = discord.Client()
    # channel = server.get_channel("354124217572130818")
    # await client.send_message(channel, '@here, it looks like people need help in a channel. Go check it out!')

@bot.command()
async def thinking():
    """HOOO KNOOOOWS"""
    await bot.say(':thinking:')

@bot.group(pass_context=True)
async def cool(ctx):
    """Says if a user is cool.
    In reality this just checks if a subcommand is being invoked.
    """
    if ctx.invoked_subcommand is None:
        await bot.say('No, {0.subcommand_passed} is not cool'.format(ctx))

@cool.command(name='bot')
async def _bot():
    """Is the bot cool?"""
    await bot.say('Yes, the bot is cool.')

@bot.listen()
async def on_message(message: discord.Message):

    if ';help' in message.content:
        await bot.send_message('AmusedGrape#6780', message.author + ' needs your help.')

bot.run('MzM1NTkxNzY5NDE0Njk2OTYx.DI5EjA.NjqKmok7Z0N2KdS-1CmwOxCfToY')
