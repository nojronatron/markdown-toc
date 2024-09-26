# Special Characters Testing File ##

## Expected ToC ##

```text
- [Expected ToC](#expected-toc)
- [Second ,.;[]{}!@$%^&*() Heading](#second--heading)
- [Dotnet.net](#dotnetnet)
- [Some &$^%&*() Special Characters](#some--special-characters)
- [Lots   of   spaces](#lots---of---spaces)
- [My   Spacey   Heading](#my---spacey---heading)
- [This- Illegal _Characters Heading](#this--illegal-_characters-heading)
- [Other!@# Character $%^ Instances &*() Heading](#other-character--instances--heading)
- [F,i.f;th[ ]{}H!e=a+d~in&g*C?h'a"l\l|e/n-g_()e](#fifth-headingchallen-g_e)
- [Footer](#footer)
```

## Second ,.;:[]{}!@$%^&*() Heading ##

- Optional: Trim to a single ' ' character between heading name words.
- Character ':' and ' ' are both replaced by '-' characters in the lowered kebab link.

## Parens (Heading) ##

Headings with parens `(` and `)` should be processed without error.

## Dotnet.net ##

- Title name should remain "Dotnet.net".
- Lower-kebab-case link fragment should be "dotnetnet'.

## Some &$^%&*() Special Characters ##

- Optional: Trim to a single ' ' character between heading name words.
- Characters and spaces between 'Some' and 'Special' should be replaced by just a pair of '-' characters in lowered kebab.

## Lots   of   spaces ##

- Optional: Trim to a single ' ' character between heading name words.
- Each ' ' character in the lowered kebab should be represented with a '-' character.

## My   Spacey   Heading ##

- Optional: Trim to a single ' ' character between heading name words.
- Each ' ' character in the target should be represented with a '-' character.

## This:- Illegal _<>Characters Heading ##

- Required: Remove '-', '<', and '>' characters in heading name.
- Each ':', '<', and '>' and removed from lowered-kebab-case fragment.
- Characters '-' and '_' are retaining in the lowered-kebab-case fragment.

## Other!@# Character $%^ Instances &*() Heading ##

- Original: "#other!@#-character-$%^-instances-&*()-heading".
- Optional: Replace '#' character in Heading Name.
- Optional: Replace extraneous ' ' characters.
- Remove the following characters from lowered-kebab fragment: '!@#$%^&*()'.
- Maintain '-' characters in lowered-kebab fragment.

## F,i.f;th[ ]{}H!e=a+d~in&g*C?h'a"l\l|e/n-g_()e ##

- Optional: Remove extraneous '_' and/or ' ' characters.
- Remove the following characters from the lowered kebab fragment: ',.;[]{}!=+~&*?'"\|/()'

## Footer ##

Fin
