using Bunit;
using EM_Blazor_Bootstrap.Components.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Xunit;

namespace EM_Blazor_Bootstrap.Components.Tests.Components;

public class EmButtonTests : BunitContext
{
    [Fact]
    public void Renders_default_primary_button()
    {
        var cut = Render<EmButton>(p => p
            .AddChildContent("Click me"));

        Assert.Contains("btn-primary", cut.Find("button").ClassName);
        Assert.Equal("Click me", cut.Find("button").TextContent.Trim());
    }

    [Fact]
    public void Renders_outline_variant()
    {
        var cut = Render<EmButton>(p => p
            .Add(c => c.Outline, true)
            .Add(c => c.Variant, "danger"));

        Assert.Contains("btn-outline-danger", cut.Find("button").ClassName);
    }

    [Fact]
    public void Renders_small_size_class()
    {
        var cut = Render<EmButton>(p => p
            .Add(c => c.Size, "sm"));

        Assert.Contains("btn-sm", cut.Find("button").ClassName);
    }

    [Fact]
    public void Disabled_attribute_is_set_when_true()
    {
        var cut = Render<EmButton>(p => p
            .Add(c => c.Disabled, true));

        Assert.True(cut.Find("button").HasAttribute("disabled"));
    }

    [Fact]
    public void Shows_spinner_when_loading()
    {
        var cut = Render<EmButton>(p => p
            .Add(c => c.Loading, true));

        Assert.NotNull(cut.Find("span.spinner-border"));
    }

    [Fact]
    public void OnClick_callback_is_invoked()
    {
        var clicked = false;
        var cut = Render<EmButton>(p => p
            .Add(c => c.OnClick, EventCallback.Factory.Create<MouseEventArgs>(this, () => clicked = true)));

        cut.Find("button").Click();

        Assert.True(clicked);
    }
}
