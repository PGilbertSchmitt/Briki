# Briki, a Brisk Wiki (??)

Okay, so I wanted a Wiki-writing application that used simple Markdown, stored a file's history, and used Sqlite3 for the file format. Maybe that already exists and I'm just making this for fun. Maybe it's none of your business.

With that out of the way, what else is there to say?

## Development

If you're trying to run this yourself (or you're just me from the future and forgot how to get around this), you may run into this issue while trying to run locally:
```
[23071:0215/145228.085420:FATAL:setuid_sandbox_host.cc(158)] The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing I'm aborting now. You need to make sure that /home/gilbert/dev/Briki/bin/linux-unpacked/chrome-sandbox is owned by root and has mode 4755.
```

What does this mean? I don't really have all that much of a clue. However, I did run into this [Github thread](https://github.com/electron/electron/issues/17972) on the Electron repo, which didn't really help all that much in my understanding. Nevertheless, I got past it with `sudo sysctl -w kernel.unprivileged_userns_clone=1`.