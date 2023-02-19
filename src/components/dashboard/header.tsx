import { ReactComponentElement, useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Title,
  Text,
  Avatar,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import { User } from "firebase/auth";

const HEADER_HEIGHT = 72;

interface HeaderResponsiveProps {
  links: { link: string; label: string; icon: JSX.Element }[];
  activeLink: string;
  setActiveLink: (value: string) => void;
  currentUser: User | null | undefined;
}

export function HeaderResponsive({
  links,
  activeLink,
  setActiveLink,
  currentUser,
}: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link.link);
        close();
      }}
    >
      <Group noWrap position="center" spacing="xs">
        {link.icon}
        {link.label}
      </Group>
    </a>
  ));

  return (
    // <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
    <Container className={classes.header}>
      <Title color={"blue"}>givn</Title>
      <Group position="apart" spacing={5} className={classes.links}>
        {items}
      </Group>

      <Group className={classes.links}>
        <a
          key={"profile"}
          href={"/dashboard/profile"}
          className={cx(classes.link, {
            [classes.linkActive]: activeLink === "/dashboard/profile",
          })}
          onClick={(event) => {
            event.preventDefault();
            setActiveLink("/dashboard/profile");
            close();
          }}
        >
          {/* <div className="flex-col justify-center items-center text-right">
                  <Text>Profile</Text>
                  <Text className="text-xs text-gray-400">{currentUser?.email}</Text>
              </div> */}
          <Group noWrap position="center" spacing="xs">
            {/* <Text className="text-xs">{currentUser?.email}</Text> */}
            <Text>Profile</Text>
            <IconUserCircle />
          </Group>
        </a>
      </Group>

      <Burger
        opened={opened}
        onClick={toggle}
        className={classes.burger}
        size="sm"
      />

      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            {items}
            <a
              key={"Profile"}
              href={"/dashboard/profile"}
              className={cx(classes.link, {
                [classes.linkActive]: activeLink === "/dashboard/profile",
              })}
              onClick={(event) => {
                event.preventDefault();
                setActiveLink("/dashboard/profile");
                close();
              }}
            >
              <Group noWrap position="center" spacing="xs">
                <IconUserCircle />
                Profile
              </Group>
            </a>
          </Paper>
        )}
      </Transition>
    </Container>
    // </Header>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));
