import { Switch, Thumb } from "@radix-ui/react-switch";

export const ThemeSwitch = () => {
  return (
    <div className="ps-4 rounded-2xl mt-4">
      <div className="flex items-center py-3.5 width-full justify-center gap-x-6 bg-light-grey">
        <img src="/icons/icon-light-theme.svg" alt="light theme" />
        <Switch className="relative h-[20px] w-[40px] cursor-default rounded-full bg-primary  outline-none  data-[state=checked]:bg-primary">
          <Thumb className="block size-[14px] translate-x-0.5 rounded-full bg-white  transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch>
        <img src="/icons/icon-dark-theme.svg" alt="dark theme" />
      </div>
    </div>
  );
};
