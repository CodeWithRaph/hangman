# hangman

This Repositorie is my contribution to a study group project.

## Context

We have to create an **escape game** using **4 transmission media** *(at least one per student)*.
The escape game will be presented at our **university institute's open days**.
Each one of us do his job appart and then we will but all the pieces together.

## My contribution

### WI-FI Transmission

The idea is to deturn the captive portal into a **mini-game**.
By finishing the previous step of the escape game the players will access to the **WI-FI Access Point**.

In most cases the Access Point **redirect** the client to a **Captive Portal**. Portal which redirect by authentication to internet.

But we **don't need that in this project**. In this context we just need to redirect the client to a **Captive Portal** and **forget about the routing**. And instead of creating a form, create a **hangman mini game**.

Check `doc-comming-soon` to understand how to create an **AP** with a **Captive Portal** on **Linux**. 

### Security

Because we **don't want the player to cheat** we will get harder the understanding of the code by **obfuscating** it.

The **word list is hashed**. But to process the score and the display we need a comparison because the **hash is not reversible**.
So we should have the **same word list in hexadecimal**. Because hexadecimal is not **naturally readable**.
