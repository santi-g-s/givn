import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Title, Text, Avatar, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons';
import image from 'next/image';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
  activeLink: string;
  setActiveLink: (value: string) => void;
}

export function HeaderResponsive({ links, activeLink, setActiveLink }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: activeLink === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    // <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header}>
        {/* <MantineLogo size={28} /> */}
        <Title color={'blue'}>givn</Title>
        <Group spacing={5} className={classes.links}>
          {items}
          
        </Group>

        <Group className={classes.links}>
            <UnstyledButton className={classes.user} >
                <Group>
                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        Profile
                     </Text>

                     <Text color="dimmed" size="xs">
                        User Name
                    </Text>
                </div>
                <Avatar src={"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"} radius="xl" />
                </Group>
            </UnstyledButton>
        </Group>

        

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              <a
                key={'Profile'}
                href={'k'}
                className={cx(classes.link, { [classes.linkActive]: activeLink === '' })}
                onClick={(event) => {
                    event.preventDefault();
                    setActiveLink('');
                    close();
                }}
                >
                Profile
              </a>
            </Paper>
          )}
        </Transition>
      </Container>
    // </Header>
  );
}